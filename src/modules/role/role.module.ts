import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        RoleController,],
    providers: [
        RoleService,],
})
export class RoleModule { }
