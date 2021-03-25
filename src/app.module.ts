import { UserModule } from './system/user/user.module';
import { UserService } from './system/user/user.service';
import { UserController } from './system/user/user.controller';
import { RoleModule } from './system/role/role.module';
import { RoleService } from './system/role/role.service';
import { RoleController } from './system/role/role.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    UserModule,
    RoleModule],
  controllers: [
    UserController,
    RoleController, AppController],
  providers: [
    UserService,
    RoleService, AppService],
})
export class AppModule { }
