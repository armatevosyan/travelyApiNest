export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  roleId?: number;
}

export interface SignInData {
  email: string;
  password: string;
}
