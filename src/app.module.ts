
import { DeptModule } from './modules/dept/dept.module';
import { PostModule } from './modules/post/post.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { MenuModule } from './modules/menu/menu.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/exception/all-exception.filter';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/index'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RedisModule } from 'nestjs-redis';


@Module({
  imports: [
    DeptModule,
    PostModule,
    TenantModule,
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
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          entities: ['dist/**/*.entity{.ts,.js}'],
          keepConnectionAlive: true,
          ...configService.get('db.mysql')
        }
      },
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('redis')
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }
  ],
})
export class AppModule { }
