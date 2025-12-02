import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * Página Tutorial
 * 
 * Links a videos de YT para aprender a resolver cada cubo
 */
@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tutorial.html',
  styleUrls: ['./tutorial.css']
})
export class Tutorial {
  
  tutorialSeleccionado: any = null;
  
  /**
   * Array con tutorial para cada cubo
   * 
   * en imagen esta la portada de YT
   * en videoId el ID de cada video en YouTube
   */
  tutoriales = [
    {
      id: 1,
      titulo: 'Cómo Resolver el Cubo 3x3 - Tutorial Completo',
      descripcion: 'Aprende a resolver el cubo 3x3 desde cero con este tutorial paso a paso.',
      nivel: 'Principiante',
      duracion: '18 min',
      instructor: 'Cube Master',
      imagen: 'https://img.youtube.com/vi/GyY0OxDk5lI/maxresdefault.jpg',
      videoId: 'GyY0OxDk5lI',
      tipoCubo: '3x3',
      pasos: ['Cruz blanca', 'Primera capa completa', 'Segunda capa', 'Cruz amarilla', 'Orientación última capa', 'Permutación última capa'],
      materialNecesario: ['Cubo 3x3']
    },
    {
      id: 2,
      titulo: 'Tutorial Cubo 2x2 - Método Principiante',
      descripcion: 'Resuelve el cubo 2x2 fácilmente con este método simplificado.',
      nivel: 'Principiante',
      duracion: '10 min',
      instructor: 'SpeedCubeShop',
      imagen: 'https://img.youtube.com/vi/f85wqJTIDlw/maxresdefault.jpg',
      videoId: 'f85wqJTIDlw',
      tipoCubo: '2x2',
      pasos: ['Primera capa', 'Orientación de la última capa', 'Permutación de la última capa'],
      materialNecesario: ['Cubo 2x2']
    },
    {
      id: 3,
      titulo: 'Cómo Resolver el Cubo 4x4 - Guía Completa',
      descripcion: 'Domina el cubo 4x4 aprendiendo a manejar la paridad.',
      nivel: 'Intermedio',
      duracion: '25 min',
      instructor: 'CubeSkills',
      imagen: 'https://img.youtube.com/vi/d_4xk1r9hxU/maxresdefault.jpg',
      videoId: 'd_4xk1r9hxU',
      tipoCubo: '4x4',
      pasos: ['Resolver centros', 'Emparejar aristas', 'Resolver como 3x3', 'Paridad de aristas', 'Paridad de esquinas'],
      materialNecesario: ['Cubo 4x4']
    },
    {
      id: 4,
      titulo: 'Tutorial Cubo 5x5 - Método de Reducción',
      descripcion: 'Aprende el método de reducción para resolver el cubo 5x5.',
      nivel: 'Avanzado',
      duracion: '22 min',
      instructor: 'J Perm',
      imagen: 'https://img.youtube.com/vi/6uaq-xfFs98/maxresdefault.jpg',
      videoId: '6uaq-xfFs98',
      tipoCubo: '5x5',
      pasos: ['Centros 3x3', 'Centros completos', 'Aristas', 'Resolver como 3x3', 'Últimos ajustes'],
      materialNecesario: ['Cubo 5x5']
    },
    {
      id: 5,
      titulo: 'Cómo Resolver el Pyraminx - Fácil y Rápido',
      descripcion: 'Aprende a resolver el Pyraminx en menos de 5 minutos.',
      nivel: 'Principiante',
      duracion: '7 min',
      instructor: 'CubeHead',
      imagen: 'https://img.youtube.com/vi/4cJJe9RAzAU/maxresdefault.jpg',
      videoId: '4cJJe9RAzAU',
      tipoCubo: 'Pyraminx',
      pasos: ['Resolver vértices', 'Centros de primera capa', 'Últimas piezas', 'Orientación final'],
      materialNecesario: ['Pyraminx']
    },
    {
      id: 6,
      titulo: 'Tutorial Megaminx - Resolución Completa',
      descripcion: 'Guía paso a paso para resolver el Megaminx (dodecaedro).',
      nivel: 'Intermedio',
      duracion: '35 min',
      instructor: 'CubeMaster',
      imagen: 'https://img.youtube.com/vi/xuKbT6Il0Ko/maxresdefault.jpg',
      videoId: 'xuKbT6Il0Ko',
      tipoCubo: 'Megaminx',
      pasos: ['Estrella inicial', 'Primeras capas', 'Resolución como 3x3 extendido', 'Última capa', 'Ajustes finales'],
      materialNecesario: ['Megaminx']
    }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  // Obtiene la URL del video a partir del atributo videoId
  getVideoUrl(videoId: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // Abre el modal
  verDetalles(tutorial: any) {
    this.tutorialSeleccionado = tutorial;
  }

  // Cierra el modal
  cerrarModal() {
    this.tutorialSeleccionado = null;
  }

  // Función para abrir video directamente en YouTube
  abrirEnYouTube(videoId: string) {
    window.open(`https://youtube.com/watch?v=${videoId}`, '_blank');
  }

  // Método para formatear la duración (opcional)
  formatearDuracion(minutos: string): string {
    const num = parseInt(minutos);
    if (num < 60) return `${num} min`;
    const horas = Math.floor(num / 60);
    const mins = num % 60;
    return mins > 0 ? `${horas}h ${mins}min` : `${horas}h`;
  }
}