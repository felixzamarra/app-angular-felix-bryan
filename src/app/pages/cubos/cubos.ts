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
  
  cuboSeleccionado: any = null;
  
  cubos = [
    {
      id: 1,
      nombre: 'Cubo 3x3',
      descripcion: 'El clásico cubo de Rubik. Perfecto para empezar.',
      dificultad: 'Principiante',
      imagen: 'https://images.pexels.com/photos/19677/pexels-photo.jpg',
      precio: '15.99€',
      detalles: {
        tipo: 'Estándar',
        piezas: 26,
        colores: 6,
        algoritmo: 'Método principiante (LBL)',
        caracteristicas: ['Magnético', 'Ajustable', 'Lubricado']
      }
    },
    {
      id: 2,
      nombre: 'Cubo 2x2',
      descripcion: 'Versión más pequeña, ideal para niños.',
      dificultad: 'Fácil',
      imagen: 'https://i.ytimg.com/vi/HdpjZFkByV0/maxresdefault.jpg',
      precio: '9.99€',
      detalles: {
        tipo: 'Pocket Cube',
        piezas: 8,
        colores: 6,
        algoritmo: 'Método Ortega',
        caracteristicas: ['Portátil', 'Ideal para niños', 'Aprendizaje rápido']
      }
    },
    {
      id: 3,
      nombre: 'Cubo 4x4',
      descripcion: 'Conocido como "Rubiks Revenge". Más complejo.',
      dificultad: 'Intermedio',
      imagen: 'https://i.ytimg.com/vi/d_4xk1r9hxU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDKBHHZKOKVKejhiYhUp5RKoCaxBg',
      precio: '24.99€',
      detalles: {
        tipo: 'Rubiks Revenge',
        piezas: 56,
        colores: 6,
        algoritmo: 'Método Yau',
        caracteristicas: ['Paridad', 'Más algoritmos', 'Desafío intermedio']
      }
    },
    {
      id: 4,
      nombre: 'Cubo 5x5',
      descripcion: 'Para expertos. Alto nivel de dificultad.',
      dificultad: 'Avanzado',
      imagen: 'https://i.ytimg.com/vi/9X-mW6wbnQQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBFZM-Fm1XW6uCFWU-HJ-go_zEMEA',
      precio: '34.99€',
      detalles: {
        tipo: 'Professor Cube',
        piezas: 98,
        colores: 6,
        algoritmo: 'Método reducción',
        caracteristicas: ['Alta complejidad', 'Para expertos', 'Tiempo prolongado']
      }
    },
    {
      id: 5,
      nombre: 'Pyraminx',
      descripcion: 'Cubo piramidal de 4 caras.',
      dificultad: 'Fácil',
      imagen: 'https://i.ytimg.com/vi/74PIPm9-uPg/maxresdefault.jpg',
      precio: '12.99€',
      detalles: {
        tipo: 'Pirámide',
        piezas: 14,
        colores: 4,
        algoritmo: 'Método básico',
        caracteristicas: ['Forma piramidal', 'Resolución rápida', 'Ideal para niños']
      }
    },
    {
      id: 6,
      nombre: 'Megaminx',
      descripcion: 'Cubo dodecaédrico con 12 caras.',
      dificultad: 'Intermedio',
      imagen: 'https://i.ytimg.com/vi/xuKbT6Il0Ko/maxresdefault.jpg',
      precio: '29.99€',
      detalles: {
        tipo: 'Dodecaedro',
        piezas: 50,
        colores: 12,
        algoritmo: 'Extensión del 3x3',
        caracteristicas: ['12 caras', 'Forma esférica', 'Desafío único']
      }
    }
  ];
  
  verDetalles(cubo: any) {
    this.cuboSeleccionado = cubo;
  }

  cerrarModal() {
    this.cuboSeleccionado = null;
  }

  getRecomendacion(dificultad: string): string {
    if (dificultad === 'Principiante') return 'Nuevos en el mundo del cubing';
    if (dificultad === 'Fácil') return 'Niños y principiantes avanzados';
    if (dificultad === 'Intermedio') return 'Cubers con experiencia';
    if (dificultad === 'Avanzado') return 'Expertos y competidores';
    return 'Todos los niveles';
  }

  manejarErrorImagen(event: any) {
    console.log('Error cargando imagen');
    event.target.style.display = 'none';
  }
}