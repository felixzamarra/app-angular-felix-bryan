import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cubos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cubos.html',
  styleUrls: ['./cubos.css']
})
export class Cubos {
  
  cubos = [
    {
      id: 1,
      nombre: 'Cubo 3x3',
      descripcion: 'El clásico cubo de Rubik. Perfecto para empezar.',
      dificultad: 'Principiante',
      imagen: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.puzzlesingenio.com%2Fcubos-rubiks-precios-marcas-puzzles-ingenio%2F251-cubo-profesional-qi-yi-3x3.html%3Fsrsltid%3DAfmBOoqUIit4WEF4o_V9W0MjfeOGWC6oqVPCE0CARsDNFuhPEpCB4Cha&psig=AOvVaw36lN9btENDsjFVW_DPF_8u&ust=1764606602009000&source=images&opi=89978449',
      precio: '15.99€'
    },
    {
      id: 2,
      nombre: 'Cubo 2x2',
      descripcion: 'Versión más pequeña, ideal para niños.',
      dificultad: 'Fácil',
      imagen: 'https://via.placeholder.com/400x300/00FF00/FFFFFF?text=2x2+Cubo',
      precio: '9.99€'
    },
    {
      id: 3,
      nombre: 'Cubo 4x4',
      descripcion: 'Conocido como "Rubiks Revenge". Más complejo.',
      dificultad: 'Intermedio',
      imagen: 'https://via.placeholder.com/400x300/0000FF/FFFFFF?text=4x4+Cubo',
      precio: '24.99€'
    },
    {
      id: 4,
      nombre: 'Megaminx',
      descripcion: 'Cubo dodecaédrico con 12 caras.',
      dificultad: 'Intermedio',
      imagen: 'https://via.placeholder.com/400x300/FF00FF/FFFFFF?text=Megaminx',
      precio: '29.99€'
    },
    {
      id: 5,
      nombre: 'Pyraminx',
      descripcion: 'Cubo piramidal de 4 caras.',
      dificultad: 'Fácil',
      imagen: 'https://via.placeholder.com/400x300/FFFF00/000000?text=Pyraminx',
      precio: '12.99€'
    },
    {
      id: 6,
      nombre: 'Cubo 5x5',
      descripcion: 'Para expertos. Alto nivel de dificultad.',
      dificultad: 'Avanzado',
      imagen: 'https://via.placeholder.com/400x300/00FFFF/000000?text=5x5+Cubo',
      precio: '34.99€'
    }
  ];

  // Si necesitas el método de error, descomenta:
  /*
  manejarErrorImagen(event: any) {
    console.log('Error cargando imagen');
    event.target.src = 'https://via.placeholder.com/400x300/CCCCCC/000000?text=Error';
  }
  */
}