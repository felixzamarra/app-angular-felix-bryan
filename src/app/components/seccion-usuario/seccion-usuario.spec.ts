import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeccionUsuario } from './seccion-usuario';

// Este bloque describe todas las pruebas relacionadas con el componente SeccionUsuario.
describe('SeccionUsuario', () => {

  // Declaramos dos variables:
  // - component: será la instancia del componente SeccionUsuario.
  // - fixture: será el “entorno de pruebas” donde Angular crea el componente.
  let component: SeccionUsuario;
  let fixture: ComponentFixture<SeccionUsuario>;

  // beforeEach() se ejecuta antes de cada prueba individual.
  // Aquí configuramos el módulo de pruebas y creamos el componente.
  beforeEach(async () => {

    // Configuramos el módulo de pruebas con TestBed.
    // Como SeccionUsuario es standalone, simplemente lo importamos.
    await TestBed.configureTestingModule({
      imports: [SeccionUsuario]  // Importamos el componente que vamos a testear.
    })
    .compileComponents();  // Compilamos las plantillas HTML del componente.

    // Creamos el componente dentro del entorno de pruebas.
    fixture = TestBed.createComponent(SeccionUsuario);

    // Obtenemos la instancia real del componente.
    component = fixture.componentInstance;

    // Esperamos a que Angular termine cualquier proceso asíncrono,
    // como ngAfterViewInit(), para que el componente esté completamente listo.
    await fixture.whenStable();
  });

  // Esta es la prueba básica: comprobar que el componente se crea correctamente.
  it('should create', () => {
    // expect(...).toBeTruthy() verifica que el componente existe y no es null.
    expect(component).toBeTruthy();
  });
});
