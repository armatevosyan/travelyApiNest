import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

import { UsersModule } from '@/modules/users/users.module';
import { RolesModule } from '@/modules/roles/role.module';
import { EmailModule } from '../email/email.module';

@Global()
@Module({
  imports: [
    UsersModule,
    RolesModule,
    EmailModule,
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '30d' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, UsersModule], // Export UsersModule so UserService is available globally
})
export class AuthModule {}
