// src/app/components/cabecera/cabecera.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  // Importamos CommonModule para *ngIf y las directivas de routing que uses
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './cabecera.html',
  styleUrls: ['./cabecera.css'],
})
export class Cabecera {
  // Inyecto el servicio de autenticación y lo expongo como `auth`
  // para que en la plantilla funcione `auth.estaLogeado()`
  constructor(public auth: AutenticacionService) {}
}
