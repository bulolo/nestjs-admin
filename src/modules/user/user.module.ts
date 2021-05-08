import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  JwtModule.registerAsync({
    imports: [
      ConfigModule,

    ],
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
    UserController,],
  providers: [
    UserService,],
  exports: [
    UserService]
})
export class UserModule { }
