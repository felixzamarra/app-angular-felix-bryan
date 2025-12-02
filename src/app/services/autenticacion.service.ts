// src/app/services/autenticacion.service.ts

import { Injectable } from '@angular/core';
import { Usuario, UsuarioRegistro } from '../models/usuario.model';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  // ============================================
  //   Usuarios de prueba
  // ============================================
  private usuarios: Usuario[] = [
    {
      id: '1',
      email: 'juan.perez@email.com',
      nombre: 'Juan',
      passwordHash: 'perez',
      salt: 'juanperez',
      fechaRegistro: new Date('2025-10-01'),
      activo: true
    },
    {
      id: '2',
      email: 'maria.gomez@email.com',
      nombre: 'María',
      passwordHash: 'gomez',
      salt: 'mariagomez',
      fechaRegistro: new Date('2025-09-01'),
      activo: true
    },
    {
      id: '3',
      email: 'carlos.lopez@email.com',
      nombre: 'Carlos',
      passwordHash: 'lopez',
      salt: 'carloslopez',
      fechaRegistro: new Date('2025-10-20'),
      activo: true
    }
  ];

  // Usuario actualmente logeado
  private usuarioActual: Usuario | null = null;

  // Constantes de seguridad (PDF registro)
  private readonly PBKDF2_ITERATIONS = 100000;
  private readonly KEY_LENGTH = 256; // bits

  constructor() {
    // Al iniciar el servicio, convertimos las contraseñas en texto plano
    // a hashes PBKDF2, usando su salt.
    this.migrarUsuariosInseguros();
  }

  // ============================================
  //   Migración de usuarios "inseguros"
  // ============================================
  private migrarUsuariosInseguros(): void {
    this.usuarios = this.usuarios.map(u => {
      // Heurística sencilla: si el passwordHash es muy corto,
      // probablemente es la contraseña en texto plano.
      if (u.passwordHash.length < 20) {
        const salt = u.salt || this.generarSalt();
        const hashSeguro = this.aplicarPBKDF2(u.passwordHash, salt);
        return {
          ...u,
          salt,
          passwordHash: hashSeguro
        };
      }
      return u;
    });
  }

  // ============================================
  //   Helpers de PBKDF2
  // ============================================
  private generarSalt(): string {
    return CryptoJS.lib.WordArray.random(128 / 8).toString();
  }

  private aplicarPBKDF2(password: string, salt: string): string {
    return CryptoJS.PBKDF2(password, salt, {
      keySize: this.KEY_LENGTH / 32,
      iterations: this.PBKDF2_ITERATIONS,
      hasher: CryptoJS.algo.SHA256
    }).toString();
  }

  private generarIdUnico(): string {
    return 'user_' + Date.now() + '_' +
      Math.random().toString(36).substring(2, 11);
  }

  private verificarUsuarioExiste(email: string): boolean {
    const normalizado = email.toLowerCase().trim();
    return this.usuarios.some(u => u.email.toLowerCase() === normalizado);
  }

  // ============================================
  //   Registro seguro (PDF de registro)
  // ============================================
  generarUsuario(usuarioRegistro: UsuarioRegistro): Usuario {
    if (this.verificarUsuarioExiste(usuarioRegistro.email)) {
      throw new Error('Ya existe un usuario con ese email');
    }

    const salt = this.generarSalt();
    const passwordHash = this.aplicarPBKDF2(usuarioRegistro.password, salt);

    const usuario: Usuario = {
      id: this.generarIdUnico(),
      email: usuarioRegistro.email.toLowerCase().trim(),
      nombre: usuarioRegistro.nombre.trim(),
      passwordHash,
      salt,
      fechaRegistro: new Date(),
      activo: true
    };

    // Lo guardamos en memoria
    this.usuarios.push(usuario);

    return usuario;
  }

  // Comprobación de fortaleza de contraseña
  verificarFortalezaPassword(password: string): { esSegura: boolean; errores: string[] } {
    const errores: string[] = [];

    if (password.length < 8) errores.push('Mínimo 8 caracteres');
    if (!/[A-Z]/.test(password)) errores.push('Al menos una mayúscula');
    if (!/[a-z]/.test(password)) errores.push('Al menos una minúscula');
    if (!/[0-9]/.test(password)) errores.push('Al menos un número');
    if (!/[!@#$%^&*()_+\-=\[\]{};\'":\\|,.<>\/?]/.test(password)) {
      errores.push('Al menos un carácter especial');
    }

    return {
      esSegura: errores.length === 0,
      errores
    };
  }

  // ============================================
  //   LOGIN
  // ============================================
  validarCredenciales(identificador: string, contraseña: string): boolean {
    const idNormalizado = identificador.toLowerCase().trim();

    const usuario = this.usuarios.find(
      u =>
        u.nombre.toLowerCase() === idNormalizado ||
        u.email.toLowerCase() === idNormalizado
    );

    if (!usuario) {
      this.usuarioActual = null;
      return false;
    }

    // Volvemos a calcular el hash de la contraseña introducida
    const hashIntroducido = this.aplicarPBKDF2(contraseña, usuario.salt);

    if (hashIntroducido === usuario.passwordHash) {
      this.usuarioActual = usuario;
      return true;
    }

    this.usuarioActual = null;
    return false;
  }

  // ============================================
  //   Estado de sesión
  // ============================================
  estaLogeado(): boolean {
    return this.usuarioActual !== null;
  }

  logout(): void {
    this.usuarioActual = null;
  }

  obtenerUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }

  // ============================================
  //   Otros métodos útiles
  // ============================================
  obtenerUsuarios(): Usuario[] {
    return this.usuarios;
  }

  obtenerUsuarioPorNombreUsuario(nombreUsuario: string): Usuario | undefined {
    const n = nombreUsuario.toLowerCase().trim();
    return this.usuarios.find(u => u.nombre.toLowerCase() === n);
  }
}
