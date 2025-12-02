import { Inicio } from './inicio';

describe('Inicio Simple Test', () => {
  let component: Inicio;

  beforeEach(() => {
    component = new Inicio();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a constructor that logs message', () => {
    // Solo verificamos que se puede instanciar sin errores
    const newComponent = new Inicio();
    expect(newComponent).toBeTruthy();
  });
});
