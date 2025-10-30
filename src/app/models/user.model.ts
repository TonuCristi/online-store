export interface RegisterUserForm {
  email: string;
  password: string;
}

export interface LoginUserForm {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}
