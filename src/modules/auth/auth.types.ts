export enum EAuthProvider {
  GOOGLE = 'google',
  APPLE = 'apple',
  EMAIL = 'email',
}

export interface SignupData {
  email: string;
  password: string;
  fullName?: string;
  roleId: number;
  verifyCode: string;
  otpExpiration: Date;
  isActive: boolean;
  provider?: EAuthProvider;
}
