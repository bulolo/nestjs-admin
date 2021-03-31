import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { BaseService } from 'src/modules/_base/base.service';
import { UserEntity } from './user.entity';
import { Result } from 'src/common/utils/result';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { classToPlain, plainToClass } from 'class-transformer';
@Injectable()
export class UserService extends BaseService<UserEntity>{
    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRep: Repository<UserEntity>
    ) {
        super(userRep);
    }
    async create(dto: CreateUserDto): Promise<Result> {
        const user = plainToClass(UserEntity, dto)
        const res = await this.userRep.save(user)
        return Result.ok(res)
    }
    async list(dto: FindUsersDto): Promise<Result> {
        const { page = 1, size = 10, username, status } = dto
        const where = {
            ...(status ? { status } : null),
            ...(username ? { username: Like(`%${username}%`) } : null),
        }
        console.log(where)
        const [data,total] = await this.userRep.findAndCount({ where, order: { id: 'DESC' }, skip: size * (page - 1), take: size })
        return Result.ok({
            list: classToPlain(data),
            count:total,
            page:page,
            size:size
        })
    }

    async query(id: string): Promise<Result>{
        const res = await this.userRep.findOne(id)
        console.log(res)
        return Result.ok(res)
    }
    async updateOne(dto: CreateUserDto): Promise<Result>{

        const user = plainToClass(UserEntity, dto)
        console.log(user)
        const res = await this.userRep.update({id:'3'}, user)
        return Result.ok(res)
    }
    async deleteOne(id: string): Promise<Result>{
        const res = await this.userRep.delete(id)
        return Result.ok(res)
    }
}
