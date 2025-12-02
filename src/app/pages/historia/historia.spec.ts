import { Historia } from './historia';

describe('Historia Simple Test', () => {
  let component: Historia;

  beforeEach(() => {
    component = new Historia();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a timeline array', () => {
    expect(Array.isArray(component.timeline)).toBe(true);
    expect(component.timeline.length).toBe(5);
  });

  it('should have timeline objects with required properties', () => {
    const firstEvent = component.timeline[0];

    expect(firstEvent.year).toBe('1974');
    expect(firstEvent.title).toBe('Creación');
    expect(firstEvent.description).toBeDefined();
    expect(firstEvent.icon).toBe('🎯');
  });

  it('should have correct timeline structure', () => {
    component.timeline.forEach(event => {
      expect(event.year).toBeDefined();
      expect(typeof event.year).toBe('string');
      expect(event.title).toBeDefined();
      expect(event.description).toBeDefined();
      expect(event.icon).toBeDefined();
    });
  });

  it('should have datosImportantes array', () => {
    expect(Array.isArray(component.datosImportantes)).toBe(true);
    expect(component.datosImportantes.length).toBe(6);
  });

  it('should have datosImportantes with icon and text', () => {
    const firstFact = component.datosImportantes[0];

    expect(firstFact.icon).toBe('🔢');
    expect(firstFact.text).toBe('43 trillones de combinaciones posibles');
  });

  it('should validate all datosImportantes have required properties', () => {
    component.datosImportantes.forEach(fact => {
      expect(fact.icon).toBeDefined();
      expect(typeof fact.icon).toBe('string');
      expect(fact.text).toBeDefined();
      expect(typeof fact.text).toBe('string');
    });
  });

  describe('timeline content validation', () => {
    it('should have correct first event', () => {
      const firstEvent = component.timeline[0];
      expect(firstEvent.year).toBe('1974');
      expect(firstEvent.title).toBe('Creación');
    });

    it('should have correct last event', () => {
      const lastEvent = component.timeline[component.timeline.length - 1];
      expect(lastEvent.year).toBe('2023');
      expect(lastEvent.title).toBe('Récords Actuales');
    });

    it('should have events in chronological order', () => {
      const years = component.timeline.map(event => parseInt(event.year));

      // Verificar que los años están en orden ascendente
      for (let i = 0; i < years.length - 1; i++) {
        expect(years[i]).toBeLessThan(years[i + 1]);
      }
    });
  });

  describe('datosImportantes content', () => {
    it('should contain specific important facts', () => {
      const texts = component.datosImportantes.map(fact => fact.text);

      expect(texts).toContain('43 trillones de combinaciones posibles');
      expect(texts).toContain('Rubik tardó 1 mes en resolver su invento');
      expect(texts).toContain('1 de cada 5 personas lo ha probado');
    });

    it('should have meaningful icons', () => {
      const icons = component.datosImportantes.map(fact => fact.icon);

      // Verificar que todos los íconos son strings no vacíos
      icons.forEach(icon => {
        expect(icon.length).toBeGreaterThan(0);
      });
    });
  });

  it('should have no empty properties in timeline', () => {
    component.timeline.forEach(event => {
      expect(event.year.trim()).not.toBe('');
      expect(event.title.trim()).not.toBe('');
      expect(event.description.trim()).not.toBe('');
      expect(event.icon.trim()).not.toBe('');
    });
  });

  it('should have no empty properties in datosImportantes', () => {
    component.datosImportantes.forEach(fact => {
      expect(fact.icon.trim()).not.toBe('');
      expect(fact.text.trim()).not.toBe('');
    });
  });
});
