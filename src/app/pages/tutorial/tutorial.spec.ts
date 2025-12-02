import { Tutorial } from './tutorial';

describe('Tutorial Simple Test', () => {
  let component: Tutorial;

  // Mock de DomSanitizer
  const sanitizerMock = {
    bypassSecurityTrustResourceUrl: (url: string) => url + '-sanitized'
  };

  beforeEach(() => {
    component = new Tutorial(sanitizerMock as any);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with no selected tutorial', () => {
    expect(component.tutorialSeleccionado).toBeNull();
  });

  it('should have an array of tutorials', () => {
    expect(Array.isArray(component.tutoriales)).toBe(true);
    expect(component.tutoriales.length).toBe(6);
  });

  it('should have tutorial objects with required properties', () => {
    const firstTutorial = component.tutoriales[0];

    expect(firstTutorial.id).toBe(1);
    expect(firstTutorial.titulo).toBeDefined();
    expect(firstTutorial.descripcion).toBeDefined();
    expect(firstTutorial.nivel).toBeDefined();
    expect(firstTutorial.duracion).toBeDefined();
    expect(firstTutorial.videoId).toBeDefined();
  });

  describe('verDetalles method', () => {
    it('should set tutorialSeleccionado when called', () => {
      const testTutorial = component.tutoriales[0];

      component.verDetalles(testTutorial);

      expect(component.tutorialSeleccionado).toBe(testTutorial);
    });
  });

  describe('cerrarModal method', () => {
    it('should set tutorialSeleccionado to null', () => {
      component.verDetalles(component.tutoriales[0]);
      expect(component.tutorialSeleccionado).not.toBeNull();

      component.cerrarModal();

      expect(component.tutorialSeleccionado).toBeNull();
    });
  });

  describe('getVideoUrl method', () => {
    it('should return sanitized URL for video', () => {
      const videoId = 'test123';
      const result = component.getVideoUrl(videoId);

      expect(result).toBe('https://www.youtube.com/embed/test123-sanitized');
    });
  });

  describe('formatearDuracion method', () => {
    it('should format minutes under 60 correctly', () => {
      expect(component.formatearDuracion('30')).toBe('30 min');
      expect(component.formatearDuracion('45')).toBe('45 min');
    });

    it('should format 60 minutes as 1h', () => {
      expect(component.formatearDuracion('60')).toBe('1h');
    });

    it('should format hours and minutes correctly', () => {
      expect(component.formatearDuracion('75')).toBe('1h 15min');
      expect(component.formatearDuracion('120')).toBe('2h');
      expect(component.formatearDuracion('135')).toBe('2h 15min');
    });
  });

  it('should have tutorials with videoId property', () => {
    component.tutoriales.forEach(tutorial => {
      expect(tutorial.videoId).toBeDefined();
      expect(typeof tutorial.videoId).toBe('string');
      expect(tutorial.videoId.length).toBeGreaterThan(0);
    });
  });

  it('should have tutorials with pasos array', () => {
    component.tutoriales.forEach(tutorial => {
      expect(Array.isArray(tutorial.pasos)).toBe(true);
      expect(tutorial.pasos.length).toBeGreaterThan(0);
    });
  });

  describe('tutorials data structure', () => {
    it('should have unique ids', () => {
      const ids = component.tutoriales.map(t => t.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have valid nivel values', () => {
      const niveles = ['Principiante', 'Intermedio', 'Avanzado'];

      component.tutoriales.forEach(tutorial => {
        expect(niveles).toContain(tutorial.nivel);
      });
    });
  });
});
