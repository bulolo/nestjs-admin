import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]),],
    controllers: [
        UserController,],
    providers: [
        UserService,],
    exports: [
      UserService]
})
export class UserModule { }
