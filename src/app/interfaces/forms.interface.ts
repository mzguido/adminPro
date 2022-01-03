export interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password2: string;
  terms: string;
}

export interface ProfileForm {
  name: string;
  email: string;
  role?: string;
}
