import { Cubos } from './cubos';

describe('Cubos Simple Test', () => {
  let component: Cubos;

  beforeEach(() => {
    component = new Cubos();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with no selected cube', () => {
    expect(component.cuboSeleccionado).toBeNull();
  });

  it('should have an array of cubes', () => {
    expect(Array.isArray(component.cubos)).toBe(true);
    expect(component.cubos.length).toBe(6);
  });

  it('should have cube objects with required properties', () => {
    const firstCube = component.cubos[0];

    expect(firstCube.id).toBe(1);
    expect(firstCube.nombre).toBeDefined();
    expect(firstCube.descripcion).toBeDefined();
    expect(firstCube.dificultad).toBeDefined();
    expect(firstCube.imagen).toBeDefined();
    expect(firstCube.precio).toBeDefined();
    expect(firstCube.detalles).toBeDefined();
  });

  describe('verDetalles method', () => {
    it('should set cuboSeleccionado when called', () => {
      const testCube = component.cubos[0];

      component.verDetalles(testCube);

      expect(component.cuboSeleccionado).toBe(testCube);
    });

    it('should select different cubes correctly', () => {
      const firstCube = component.cubos[0];
      const secondCube = component.cubos[1];

      component.verDetalles(firstCube);
      expect(component.cuboSeleccionado).toBe(firstCube);

      component.verDetalles(secondCube);
      expect(component.cuboSeleccionado).toBe(secondCube);
    });
  });

  describe('cerrarModal method', () => {
    it('should set cuboSeleccionado to null', () => {
      // Primero seleccionamos un cubo
      component.verDetalles(component.cubos[0]);
      expect(component.cuboSeleccionado).not.toBeNull();

      // Luego cerramos el modal
      component.cerrarModal();

      expect(component.cuboSeleccionado).toBeNull();
    });
  });

  describe('getRecomendacion method', () => {
    it('should return correct recommendation for Principiante', () => {
      const result = component.getRecomendacion('Principiante');
      expect(result).toBe('Nuevos en el mundo del cubing');
    });

    it('should return correct recommendation for Fácil', () => {
      const result = component.getRecomendacion('Fácil');
      expect(result).toBe('Niños y principiantes avanzados');
    });

    it('should return correct recommendation for Intermedio', () => {
      const result = component.getRecomendacion('Intermedio');
      expect(result).toBe('Cubers con experiencia');
    });

    it('should return correct recommendation for Avanzado', () => {
      const result = component.getRecomendacion('Avanzado');
      expect(result).toBe('Expertos y competidores');
    });

    it('should return default message for unknown difficulty', () => {
      const result = component.getRecomendacion('Desconocido');
      expect(result).toBe('Todos los niveles');
    });
  });

  it('should have cubes with valid difficulty levels', () => {
    const difficulties = component.cubos.map(cubo => cubo.dificultad);

    // Verificar que todas las dificultades existen
    difficulties.forEach(dificultad => {
      expect(dificultad).toBeDefined();
      expect(typeof dificultad).toBe('string');
    });
  });

  it('should have cubes with details objects', () => {
    component.cubos.forEach(cubo => {
      expect(cubo.detalles).toBeDefined();
      expect(typeof cubo.detalles).toBe('object');
      expect(cubo.detalles.tipo).toBeDefined();
      expect(Array.isArray(cubo.detalles.caracteristicas)).toBe(true);
    });
  });
});
