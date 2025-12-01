// src/app/components/seccion-usuario/seccion-usuario.ts
import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-seccion-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-usuario.html',
  styleUrl: './seccion-usuario.css'
})
export class SeccionUsuario implements AfterViewInit {

  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.setupTabs();   // Configura el sistema de pestañas
    this.setupLogin();  // Configura los eventos del formulario de login
  }

  // Configuración del sistema de pestañas
  private setupTabs(): void {
    const tabButtons = document.querySelectorAll('.tab-button');
    const forms = document.querySelectorAll('.login-form');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // 1º: Desactivar todos los botones
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // 2º: Ocultar todos los formularios
        forms.forEach(form => form.classList.remove('active'));

        // 3º: Activar el botón clicado
        button.classList.add('active');

        // 4º: Identificar el formulario a mostrar
        const tabName = button.getAttribute('data-tab');
        const formToShow = document.getElementById((tabName ?? '') + 'Form');

        // 5º: Mostrar el formulario correspondiente
        if (formToShow) {
          formToShow.classList.add('active');
        }

        // Limpiar mensajes al cambiar de pestaña
        this.limpiarMensaje();
      });
    });
  }

  // Configuramos el botón de login
  private setupLogin(): void {
    const btnLogin = document.getElementById('btnLogin');

    if (btnLogin) {
      btnLogin.addEventListener('click', () => {
        this.validarLogin();
      });
    }
  }

  private validarLogin(): void {
    const usuarioInput = document.getElementById('loginUsuario') as HTMLInputElement | null;
    const contraseñaInput = document.getElementById('loginClave') as HTMLInputElement | null;

    if (!usuarioInput || !contraseñaInput) {
      return;
    }

    const nombreUsuario = usuarioInput.value.trim();
    const contraseña = contraseñaInput.value.trim();

    // Validación 1: campos vacíos
    if (!nombreUsuario || !contraseña) {
      this.mostrarMensaje('Vamos, completa todos los campos', false);
      return;
    }

    // Validación 2: usar el servicio para verificar credenciales
    const esValido = this.autenticacionService.validarCredenciales(
      nombreUsuario,
      contraseña
    );

    if (esValido) {
      // Login correcto
      this.mostrarMensaje('Validación correcta', true);

      // Limpiar campos
      usuarioInput.value = '';
      contraseñaInput.value = '';

      // 👉 Redirigir a la página principal después de un pequeño delay
      setTimeout(() => {
        this.router.navigate(['/']); // cambia '/' si tu ruta principal es otra
      }, 800);
    } else {
      // Login incorrecto
      this.mostrarMensaje(
        'Validación incorrecta - Usuario o contraseña inválidos',
        false
      );
    }
  }

  // Mostrar mensajes de feedback al usuario
  private mostrarMensaje(texto: string, esExitoso: boolean): void {
    const mensajeDiv = document.getElementById('mensajeValidacion');

    if (mensajeDiv) {
      mensajeDiv.textContent = texto;
      mensajeDiv.style.display = 'block';

      if (esExitoso) {
        mensajeDiv.className = 'mensaje-validacion mensaje-exito';
      } else {
        mensajeDiv.className = 'mensaje-validacion mensaje-error';
      }

      setTimeout(() => {
        this.limpiarMensaje();
      }, 5000);
    }
  }

  // Limpiar mensajes del DOM
  private limpiarMensaje(): void {
    const mensajeDiv = document.getElementById('mensajeValidacion');
    if (mensajeDiv) {
      mensajeDiv.style.display = 'none';
      mensajeDiv.textContent = '';
    }
  }
}
