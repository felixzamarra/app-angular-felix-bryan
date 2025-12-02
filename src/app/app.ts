import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cabecera } from "./components/cabecera/cabecera";
import { Pie } from "./components/pie/pie";  

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, Cabecera, Pie],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}