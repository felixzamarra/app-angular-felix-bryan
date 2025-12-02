// src/app/app.spec.ts
import { App } from './app';

describe('App', () => {
  it('should create the app', () => {
    // Creamos una instancia simple de la clase App
    const app = new App();
    expect(app).toBeTruthy();
  });

  it('should have a root component defined', () => {
    // Simplemente comprobamos que la clase existe
    // (test muy básico pero suficiente para validar que el componente raíz está definido)
    expect(App).toBeDefined();
  });
});
