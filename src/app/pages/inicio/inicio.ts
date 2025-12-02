import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Página de Inicio - CubeMaster
 * 
 * Componente principal con enlaces a las secciones de la aplicación.
 */
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class Inicio {

  // Constructor vacio
  constructor() {
    console.log('Página de inicio cargada');
  }
}