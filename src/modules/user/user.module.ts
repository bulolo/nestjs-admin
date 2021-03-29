import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]),],
    controllers: [
        UserController,],
    providers: [
        UserService,],
})
export class UserModule { }
