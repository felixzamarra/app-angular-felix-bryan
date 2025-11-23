import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cabecera.html',
  styleUrls: ['./cabecera.css'] // corregido: styleUrls en plural
})
export class Cabecera {}
