import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Cabecera } from './cabecera';
import { AutenticacionService } from '../../services/autenticacion.service';

describe('Cabecera', () => {
  let component: Cabecera;
  let fixture: ComponentFixture<Cabecera>;
  let authServiceFake: AutenticacionService;
  let llamadaEstaLogeado = false;

  beforeEach(async () => {
    // Fake del servicio SIN usar jasmine.SpyObj ni jasmine.createSpy
    llamadaEstaLogeado = false;

    authServiceFake = {
      // Esta función se ejecutará cuando la cabecera llame a auth.estaLogeado()
      estaLogeado: () => {
        llamadaEstaLogeado = true;
        return false;           // simulamos que NO está logeado
      },
      // Implementamos logout aunque no lo usemos, para completar el tipo
      logout: () => {},
    } as AutenticacionService;

    await TestBed.configureTestingModule({
      imports: [Cabecera, RouterTestingModule],
      providers: [
        { provide: AutenticacionService, useValue: authServiceFake }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Cabecera);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check login state using AutenticacionService', () => {
  // Forzamos renderizado de la plantilla y evaluación del *ngIf
  fixture.detectChanges();

  // Si la cabecera ha llamado a auth.estaLogeado(), la variable será true
  expect(llamadaEstaLogeado).toBe(true);
});

});
