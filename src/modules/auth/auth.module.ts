import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('jwt.secretkey'),
        signOptions: {
          expiresIn: config.get('jwt.expiresin'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    AuthController,],
  providers: [
    AuthService,],
  exports: [AuthService],
})
export class AuthModule { }
