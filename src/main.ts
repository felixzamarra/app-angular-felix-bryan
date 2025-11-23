import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app'; // NO './app/app.ts', solo './app/app'

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
