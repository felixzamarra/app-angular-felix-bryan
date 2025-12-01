// src/app/services/autenticacion.service.ts
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  // Usuarios de prueba (los del PDF)
  private usuarios: Usuario[] = [
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@email.com',
      nombreUsuario: 'juanperez',
      contraseña: '1111'
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'Gómez',
      email: 'maria.gomez@email.com',
      nombreUsuario: 'mariagomez',
      contraseña: '2222'
    },
    {
      id: 3,
      nombre: 'Carlos',
      apellido: 'López',
      email: 'carlos.lopez@email.com',
      nombreUsuario: 'carloslopez',
      contraseña: '3333'
    }
  ];

  // 👇 Usuario actualmente logeado (null si no hay)
  private usuarioActual: Usuario | null = null;

  // Verifica credenciales y guarda usuarioActual si son correctas
  validarCredenciales(nombreUsuario: string, contraseña: string): boolean {
    const usuario = this.usuarios.find(
      u => u.nombreUsuario === nombreUsuario && u.contraseña === contraseña
    );

    if (usuario) {
      this.usuarioActual = usuario;
      return true;
    } else {
      this.usuarioActual = null;
      return false;
    }
  }

  // ¿Hay alguien logeado?
  estaLogeado(): boolean {
    return this.usuarioActual !== null;
  }

  // Cerrar sesión
  logout(): void {
    this.usuarioActual = null;
  }

  // Obtener usuario actual (por si lo necesitas en el futuro)
  obtenerUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }

  // Métodos del PDF (por si los usas luego)
  obtenerUsuarios(): Usuario[] {
    return this.usuarios;
  }

  obtenerUsuarioPorNombreUsuario(nombreUsuario: string): Usuario | undefined {
    return this.usuarios.find(u => u.nombreUsuario === nombreUsuario);
  }
}
