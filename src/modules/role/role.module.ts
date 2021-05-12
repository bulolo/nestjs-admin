import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [
    RoleController,],
  providers: [
    RoleService,],
})
export class RoleModule { }
