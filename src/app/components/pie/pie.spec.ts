import { Pie } from './pie';

describe('Pie Simple Test', () => {
  let component: Pie;
  let currentYear: number;

  beforeEach(() => {
    currentYear = new Date().getFullYear();
    component = new Pie();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have currentYear property', () => {
    expect(component.currentYear).toBeDefined();
  });

  it('should set currentYear to current year', () => {
    // Tolerancia de ±1 año por si la prueba cruza año nuevo
    expect(component.currentYear).toBeGreaterThanOrEqual(currentYear - 1);
    expect(component.currentYear).toBeLessThanOrEqual(currentYear + 1);
  });
});
