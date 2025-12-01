import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class Inicio {
  featuredCubes = [
    { name: '3x3 Classic', price: '€15.99', image: '🎲', color: '#f7000c' },
    { name: 'Speed Cube', price: '€24.99', image: '⚡', color: '#eec200' },
    { name: 'Megaminx', price: '€32.99', image: '🔺', color: '#0066cc' },
    { name: 'Pyramid', price: '€18.99', image: '🔷', color: '#00cc66' }
  ];

  stats = [
    { number: '50K+', label: 'Cubos Vendidos' },
    { number: '5K+', label: 'Clientes Felices' },
    { number: '100+', label: 'Tutoriales' },
    { number: '24/7', label: 'Soporte' }
  ];

  tutorials = [
    { title: 'Principiantes 3x3', time: '15 min', level: 'Fácil' },
    { title: 'Método CFOP', time: '45 min', level: 'Avanzado' },
    { title: 'Patrones Cool', time: '25 min', level: 'Intermedio' }
  ];
}