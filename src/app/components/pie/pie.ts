import { Component } from '@angular/core';

@Component({
  selector: 'app-pie',
  standalone: true,
  templateUrl: './pie.html',
  styleUrls: ['./pie.css']
})
export class Pie {
  currentYear: number = new Date().getFullYear();
}
