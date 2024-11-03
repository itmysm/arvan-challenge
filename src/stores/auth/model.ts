export interface User {
  username: string;
}

export interface LoginResponse {
  username: string
}

export interface RegisterPayload {
  email: string | null,
  password: string | null,
  username: string | null
}

export interface LoginPayload {
  email: string | null,
  password: string | null
}

export interface CheckServerStatus {
  isAccessible: boolean
}