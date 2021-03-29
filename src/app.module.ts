import { MenuModule } from './modules/menu/menu.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/exception/exception.filter';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/index'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    MenuModule,
    AuthModule,
    RoleModule,
    UserModule,
    //配置模块
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      isGlobal: true
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
    }),],
  controllers: [],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // }
  ],
})
export class AppModule { }
