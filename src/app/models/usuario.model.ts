

// Usuario almacenado en la app
export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  passwordHash: string;
  salt: string;
  fechaRegistro: Date;
  activo: boolean;
}

// Para el registro de usuarios
export interface UsuarioRegistro {
  nombre: string;
  email: string;
  password: string;
}

// Para el login (en el login.component del PDF)
export interface UsuarioLogin {
  email: string;
  password: string;
}

// Payload del “JWT” simulado
export interface JWTPayload {
  usuarioId: string;
  email: string;
  nombre: string;
  exp: number;
  iat: number;
}
