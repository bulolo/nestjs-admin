import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/modules/_base/base.service';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService extends BaseService<UserEntity>{
    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRep: Repository<UserEntity>
    ) {
        super(userRep);
    }
    getUsers() {
        return this.userRep.find()
    }
}
