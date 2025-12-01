// src/app/components/cabecera/cabecera.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cabecera.html',
  styleUrls: ['./cabecera.css']
})
export class Cabecera {
  isMenuOpen = false;

  // 👇 Inyectamos el servicio como público para usarlo en la plantilla
  constructor(public auth: AutenticacionService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
