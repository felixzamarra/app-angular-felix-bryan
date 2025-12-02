
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario, JWTPayload } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'app_jwt_token';
  private readonly JWT_DURACION_HORAS = 24;

  // BehaviorSubject para controlar el estado de autenticación
  private estaAutenticadoSubject: BehaviorSubject<boolean>;
  public estaAutenticado$: Observable<boolean>;

  constructor(private router: Router) {
    // Inicializar con el estado actual del token
    const tokenValido = this.verificarTokenValido();
    this.estaAutenticadoSubject = new BehaviorSubject<boolean>(tokenValido);
    this.estaAutenticado$ = this.estaAutenticadoSubject.asObservable();
  }

  /**
   * Inicia sesión y genera token JWT
   */
  login(usuario: Usuario): string {
    const token = this.generarJWT(usuario);
    this.guardarToken(token);

    // Actualizar estado de autenticación
    this.estaAutenticadoSubject.next(true);

    console.log('Login exitoso:', usuario.email);
    return token;
  }

  /**
   * Cierra la sesión
   */
  logout(): void {
    this.eliminarToken();

    // Actualizar estado de autenticación
    this.estaAutenticadoSubject.next(false);

    // Redirigir al login
    this.router.navigate(['/login']);

    console.log('Sesión cerrada');
  }

  estaAutenticado(): boolean {
    return this.estaAutenticadoSubject.value;
  }

  obtenerToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  verificarTokenValido(): boolean {
    const token = this.obtenerToken();

    if (!token) {
      return false;
    }

    try {
      const payload = this.decodificarToken(token);
      const ahora = Math.floor(Date.now() / 1000);

      if (payload.exp < ahora) {
        console.log('Token expirado');
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error verificando token:', error);
      return false;
    }
  }

  obtenerUsuarioDelToken(): { id: string; email: string; nombre: string } | null {
    const token = this.obtenerToken();

    if (!token) {
      return null;
    }

    try {
      const payload = this.decodificarToken(token);
      return {
        id: payload.usuarioId,
        email: payload.email,
        nombre: payload.nombre
      };
    } catch (error) {
      console.error('Error obteniendo usuario del token:', error);
      return null;
    }
  }

  private generarJWT(usuario: Usuario): string {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const payload: JWTPayload = {
      usuarioId: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (this.JWT_DURACION_HORAS * 60 * 60)
    };

    const headerBase64 = btoa(JSON.stringify(header));
    const payloadBase64 = btoa(JSON.stringify(payload));

    return `${headerBase64}.${payloadBase64}.simulated_signature`;
  }

  private decodificarToken(token: string): JWTPayload {
    const partes = token.split('.');
    if (partes.length !== 3) {
      throw new Error('Formato de token inválido');
    }

    const payloadBase64 = partes[1];
    const payloadString = atob(payloadBase64);
    return JSON.parse(payloadString) as JWTPayload;
  }

  private guardarToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private eliminarToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  verificarEstado(): void {
    console.log('=== ESTADO AUTH SERVICE ===');
    console.log('Token:', this.obtenerToken());
    console.log('¿Autenticado?:', this.estaAutenticado());
    console.log('Token válido?:', this.verificarTokenValido());
    console.log('Usuario del token:', this.obtenerUsuarioDelToken());
  }
}
