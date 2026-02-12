export interface SignupData {
  email: string;
  password: string;
  roleId: number;
  verifyCode: string;
  otpExpiration: Date;
  isActive: boolean;
}
