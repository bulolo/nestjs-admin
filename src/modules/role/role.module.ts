import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';

@Module({
    imports: [],
    controllers: [
        RoleController,],
    providers: [
        RoleService,],
})
export class RoleModule { }
