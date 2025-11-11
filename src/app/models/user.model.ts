export interface RegisterUserForm {
  email: string;
  password: string;
}

export interface LoginUserForm {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}
