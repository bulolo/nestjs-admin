
import { MenuModule } from './system/menu/menu.module';
import { MenuService } from './system/menu/menu.service';
import { MenuController } from './system/menu/menu.controller';
import { AuthModule } from './system/auth/auth.module';
import { AuthService } from './system/auth/auth.service';
import { AuthController } from './system/auth/auth.controller';
import { UserModule } from './system/user/user.module';
import { UserService } from './system/user/user.service';
import { UserController } from './system/user/user.controller';
import { RoleModule } from './system/role/role.module';
import { RoleService } from './system/role/role.service';
import { RoleController } from './system/role/role.controller';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/index'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    //配置模块
    ConfigModule.forRoot({
      cache:true,
      load: [configuration],
      isGlobal:true
    }),
    //配置typeorm
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          entities: ['dist/**/*.entity{.ts,.js}'],
          keepConnectionAlive: true,
          ...config.get('db.mysql')
        }
      },
    }),
    MenuModule,
    AuthModule,
    UserModule,
    RoleModule],
  controllers: [
    MenuController,
    AuthController,
    UserController,
    RoleController],
  providers: [
    MenuService,
    AuthService,
    UserService,
    RoleService],
})
export class AppModule  {}
