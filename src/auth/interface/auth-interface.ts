export interface JwtConfigOptions {
  secret?: string;
  expiresIn?: number;
}

export interface dbConfigOptions {
  host?: string;
  username?: string;
  password?: string;
  synchronize?: boolean;
  type?: string;
  port?: number;
  database?: string;
}

export interface serverConfigOptions {
  port?: number;
}
