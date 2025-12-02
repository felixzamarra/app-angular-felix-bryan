import { AutenticacionService } from './autenticacion.service';
import { UsuarioRegistro } from '../models/usuario.model';

describe('AutenticacionService Simple Test', () => {
  let service: AutenticacionService;

  beforeEach(() => {
    service = new AutenticacionService();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('verificarFortalezaPassword', () => {
    it('should reject short passwords', () => {
      const result = service.verificarFortalezaPassword('123');
      expect(result.esSegura).toBe(false);
      expect(result.errores).toContain('Mínimo 8 caracteres');
    });

    it('should reject passwords without uppercase', () => {
      const result = service.verificarFortalezaPassword('password123!');
      expect(result.esSegura).toBe(false);
      expect(result.errores).toContain('Al menos una mayúscula');
    });

    it('should reject passwords without lowercase', () => {
      const result = service.verificarFortalezaPassword('PASSWORD123!');
      expect(result.esSegura).toBe(false);
      expect(result.errores).toContain('Al menos una minúscula');
    });

    it('should reject passwords without numbers', () => {
      const result = service.verificarFortalezaPassword('Password!');
      expect(result.esSegura).toBe(false);
      expect(result.errores).toContain('Al menos un número');
    });

    it('should reject passwords without special characters', () => {
      const result = service.verificarFortalezaPassword('Password123');
      expect(result.esSegura).toBe(false);
      expect(result.errores).toContain('Al menos un carácter especial');
    });

    it('should accept strong passwords', () => {
      const result = service.verificarFortalezaPassword('Password123!');
      expect(result.esSegura).toBe(true);
      expect(result.errores.length).toBe(0);
    });
  });

  describe('validarCredenciales', () => {
    it('should validate correct credentials by name', () => {
      const isValid = service.validarCredenciales('Juan', 'perez');
      expect(isValid).toBe(true);
    });

    it('should validate correct credentials by email', () => {
      const isValid = service.validarCredenciales('juan.perez@email.com', 'perez');
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', () => {
      const isValid = service.validarCredenciales('Juan', 'wrongpassword');
      expect(isValid).toBe(false);
    });

    it('should reject non-existent user', () => {
      const isValid = service.validarCredenciales('nonexistent', 'password');
      expect(isValid).toBe(false);
    });
  });

  describe('session state', () => {
    it('should not be logged in initially', () => {
      expect(service.estaLogeado()).toBe(false);
      expect(service.obtenerUsuarioActual()).toBeNull();
    });

    it('should be logged in after successful validation', () => {
      service.validarCredenciales('Juan', 'perez');
      expect(service.estaLogeado()).toBe(true);
      expect(service.obtenerUsuarioActual()).toBeTruthy();
    });

    it('should logout correctly', () => {
      // First log in
      service.validarCredenciales('Juan', 'perez');
      expect(service.estaLogeado()).toBe(true);

      // Then log out
      service.logout();

      expect(service.estaLogeado()).toBe(false);
      expect(service.obtenerUsuarioActual()).toBeNull();
    });
  });

  describe('obtenerUsuarios', () => {
    it('should return array of users', () => {
      const users = service.obtenerUsuarios();
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThan(0);
    });

    it('should have users with required properties', () => {
      const users = service.obtenerUsuarios();
      const firstUser = users[0];

      expect(firstUser.id).toBeDefined();
      expect(firstUser.nombre).toBeDefined();
      expect(firstUser.email).toBeDefined();
      expect(firstUser.passwordHash).toBeDefined();
    });
  });

  describe('obtenerUsuarioPorNombreUsuario', () => {
    it('should find user by name (case insensitive)', () => {
      const user = service.obtenerUsuarioPorNombreUsuario('JUAN');
      expect(user).toBeTruthy();
      expect(user?.nombre).toBe('Juan');
    });

    it('should return undefined for non-existent user', () => {
      const user = service.obtenerUsuarioPorNombreUsuario('nonexistent');
      expect(user).toBeUndefined();
    });
  });

  describe('generarUsuario', () => {
    it('should create a new user with valid data', () => {
      const nuevoUsuario: UsuarioRegistro = {
        nombre: 'Test User',
        email: 'test@example.com',
        password: 'Password123!'
      };

      const user = service.generarUsuario(nuevoUsuario);

      expect(user.id).toBeDefined();
      expect(user.nombre).toBe('Test User');
      expect(user.email).toBe('test@example.com');
      expect(user.activo).toBe(true);
    });

    it('should throw error for duplicate email', () => {
      const duplicado: UsuarioRegistro = {
        nombre: 'Another Juan',
        email: 'juan.perez@email.com',
        password: 'Password123!'
      };

      expect(() => service.generarUsuario(duplicado))
        .toThrowError('Ya existe un usuario con ese email');
    });
  });

  it('should have test users available', () => {
    const users = service.obtenerUsuarios();
    expect(users.length).toBeGreaterThanOrEqual(3);

    const juan = users.find(u => u.nombre === 'Juan');
    const maria = users.find(u => u.nombre === 'María');
    const carlos = users.find(u => u.nombre === 'Carlos');

    expect(juan).toBeTruthy();
    expect(maria).toBeTruthy();
    expect(carlos).toBeTruthy();
  });
});
