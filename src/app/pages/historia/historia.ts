import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historia.html',
  styleUrls: ['./historia.css']
})
export class Historia {
  
  // Array con cada sección de la historia
  timeline = [
    {
      year: '1974',
      title: 'Creación',
      description: 'Ernő Rubik inventa el "Cubo Mágico" en Hungría como herramienta educativa.',
      icon: '🎯'
    },
    {
      year: '1980',
      title: 'Fenómeno Mundial',
      description: 'Lanzamiento internacional. Se venden 100 millones en 2 años.',
      icon: '🌍'
    },
    {
      year: '1982',
      title: 'Primer Campeonato',
      description: 'Primera competencia mundial en Budapest, Hungría.',
      icon: '🏆'
    },
    {
      year: '2003',
      title: 'Era Moderna',
      description: 'Fundación de la World Cube Association (WCA).',
      icon: '⚡'
    },
    {
      year: '2023',
      title: 'Récords Actuales',
      description: 'Tiempo récord: 3.13 segundos. Más de 450 millones vendidos.',
      icon: '🚀'
    }
  ];

  // Array con las curiosidades
  datosImportantes = [
    { icon: '🔢', text: '43 trillones de combinaciones posibles' },
    { icon: '⏱️', text: 'Rubik tardó 1 mes en resolver su invento' },
    { icon: '👥', text: '1 de cada 5 personas lo ha probado' },
    { icon: '💰', text: 'Juguete más vendido de la historia' },
    { icon: '🎓', text: 'Exhibido en el Museo de Arte Moderno de NY' },
    { icon: '🧠', text: 'Usado en estudios de neurociencia y matemáticas' }
  ];
}