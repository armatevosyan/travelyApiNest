export interface SignupData {
  email: string;
  password: string;
  fullName?: string;
  roleId: number;
  verifyCode: string;
  otpExpiration: Date;
  isActive: boolean;
  provider?: string;
}
