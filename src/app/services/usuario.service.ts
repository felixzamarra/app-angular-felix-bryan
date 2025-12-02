// src/app/services/usuario.service.ts
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Usuario, UsuarioRegistro, UsuarioLogin } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly STORAGE_KEY = 'app_usuarios';
  private readonly PBKDF2_ITERATIONS = 100000;
  private readonly KEY_LENGTH = 256;

  constructor() {
    this.cargarUsuariosPorDefecto();
  }

  /**
   * Carga usuarios por defecto si no existen
   */
  private cargarUsuariosPorDefecto(): void {
    const usuariosExistentes = this.obtenerTodosLosUsuarios();

    if (usuariosExistentes.length === 0) {
      console.log('Cargando usuarios por defecto.');

      const usuariosPorDefecto = this.generarUsuariosPorDefecto();
      usuariosPorDefecto.forEach(usuario => {
        this.guardarUsuario(usuario);
      });

      console.log(`${usuariosPorDefecto.length} usuarios por defecto cargados`);
    }
  }

  /**
   * Genera usuarios de prueba por defecto
   */
  private generarUsuariosPorDefecto(): Usuario[] {
    const usuarios: Usuario[] = [];

    // Usuario 1
    const salt1 = this.generarSalt();
    usuarios.push({
      id: 'user_1',
      email: 'usuario@ejemplo.com',
      nombre: 'Usuario de Prueba',
      passwordHash: this.aplicarPBKDF2('Password123!', salt1),
      salt: salt1,
      fechaRegistro: new Date('2024-01-01'),
      activo: true
    });

    // Usuario 2
    const salt2 = this.generarSalt();
    usuarios.push({
      id: 'user_2',
      email: 'test@test.com',
      nombre: 'Usuario Test',
      passwordHash: this.aplicarPBKDF2('Test123!', salt2),
      salt: salt2,
      fechaRegistro: new Date('2024-01-01'),
      activo: true
    });

    return usuarios;
  }

  /**
   * Verifica las credenciales de login
   */
  verificarLogin(credenciales: UsuarioLogin): { exito: boolean; usuario?: Usuario; error?: string } {
    // Validar campos
    if (!credenciales.email || !credenciales.password) {
      return { exito: false, error: 'Email y contraseña son requeridos' };
    }

    // Buscar usuario
    const usuario = this.obtenerUsuarioPorEmail(credenciales.email);

    if (!usuario) {
      return { exito: false, error: 'Usuario no encontrado' };
    }

    if (!usuario.activo) {
      return { exito: false, error: 'Usuario desactivado' };
    }

    // Verificar contraseña
    const passwordValido = this.verificarPassword(
      credenciales.password,
      usuario.passwordHash,
      usuario.salt
    );

    if (!passwordValido) {
      return { exito: false, error: 'Contraseña incorrecta' };
    }

    console.log('Credenciales válidas para:', usuario.email);

    return {
      exito: true,
      usuario: this.omitirDatosSensibles(usuario)
    };
  }

  /**
   * Verifica si una contraseña es correcta
   */
  verificarPassword(password: string, passwordHash: string, salt: string): boolean {
    const hashAttempt = this.aplicarPBKDF2(password, salt);
    return this.compararHashes(hashAttempt, passwordHash);
  }

  /**
   * Crea un nuevo usuario con contraseña segura
   */
  crearUsuario(usuarioRegistro: UsuarioRegistro): Usuario {
    // Verificar si el usuario ya existe
    if (this.verificarUsuarioExiste(usuarioRegistro.email)) {
      throw new Error('El usuario con este email ya existe');
    }

    const salt = this.generarSalt();
    const passwordHash = this.aplicarPBKDF2(usuarioRegistro.password, salt);

    const usuario: Usuario = {
      id: this.generarIdUnico(),
      email: usuarioRegistro.email.toLowerCase().trim(),
      nombre: usuarioRegistro.nombre.trim(),
      passwordHash: passwordHash,
      salt: salt,
      fechaRegistro: new Date(),
      activo: true
    };

    return usuario;
  }

  /**
   * Guarda un usuario en el almacenamiento
   */
  guardarUsuario(usuario: Usuario): void {
    const usuarios = this.obtenerTodosLosUsuarios();
    usuarios.push(usuario);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuarios));
  }

  /**
   * Obtiene todos los usuarios
   */
  obtenerTodosLosUsuarios(): Usuario[] {
    const usuariosString = localStorage.getItem(this.STORAGE_KEY);
    return usuariosString ? JSON.parse(usuariosString) : [];
  }

  /**
   * Busca usuario por email
   */
  obtenerUsuarioPorEmail(email: string): Usuario | null {
    const usuarios = this.obtenerTodosLosUsuarios();
    return usuarios.find(u => u.email === email.toLowerCase()) || null;
  }

  /**
   * Busca usuario por ID
   */
  obtenerUsuarioPorId(id: string): Usuario | null {
    const usuarios = this.obtenerTodosLosUsuarios();
    return usuarios.find(u => u.id === id) || null;
  }

  /**
   * Verifica si un usuario existe
   */
  verificarUsuarioExiste(email: string): boolean {
    const usuarios = this.obtenerTodosLosUsuarios();
    return usuarios.some(u => u.email === email.toLowerCase());
  }

  /**
   * MÉTODOS DE SEGURIDAD
   */
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

  private compararHashes(hash1: string, hash2: string): boolean {
    return CryptoJS.SHA256(hash1).toString() === CryptoJS.SHA256(hash2).toString();
  }

  private generarIdUnico(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private omitirDatosSensibles(usuario: Usuario): Usuario {
    const { passwordHash, salt, ...usuarioSeguro } = usuario;
    return usuarioSeguro as Usuario;
  }

  /**
   * MÉTODOS PARA PRUEBAS Y DESARROLLO
   */
  verificarFortalezaPassword(password: string): { esSegura: boolean; errores: string[] } {
    const errores: string[] = [];

    if (password.length < 8) {
      errores.push('Mínimo 8 caracteres');
    }
    if (!/[A-Z]/.test(password)) {
      errores.push('Al menos una mayúscula');
    }
    if (!/[a-z]/.test(password)) {
      errores.push('Al menos una minúscula');
    }
    if (!/[0-9]/.test(password)) {
      errores.push('Al menos un número');
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errores.push('Al menos un carácter especial');
    }

    return {
      esSegura: errores.length === 0,
      errores: errores
    };
  }

  obtenerEstadisticas(): { total: number; activos: number; inactivos: number } {
    const usuarios = this.obtenerTodosLosUsuarios();
    return {
      total: usuarios.length,
      activos: usuarios.filter(u => u.activo).length,
      inactivos: usuarios.filter(u => !u.activo).length
    };
  }

  eliminarUsuario(email: string): void {
    const usuarios = this.obtenerTodosLosUsuarios();
    const usuariosFiltrados = usuarios.filter(u => u.email !== email.toLowerCase());
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuariosFiltrados));
  }

  limpiarUsuarios(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    console.log('Todos los usuarios eliminados');
  }

  recargarUsuariosPorDefecto(): void {
    this.limpiarUsuarios();
    this.cargarUsuariosPorDefecto();
    console.log('Usuarios por defecto recargados');
  }
}
