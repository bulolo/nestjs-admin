import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { BaseService } from 'src/modules/_base/base.service';
import { UserEntity } from './user.entity';
import { ResultData } from 'src/common/utils/result';
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
    async create(dto: CreateUserDto): Promise<ResultData> {
        const res = await this.userRep.create(dto)
        return ResultData.ok(res)
    }
    async list(dto: FindUsersDto): Promise<ResultData> {
        const { page, size, username, status } = dto
        const where = {
            ...(status ? { status } : null),
            ...(username ? { account: Like(`%${username}%`) } : null),
        }
        const [data,total] = await this.userRep.findAndCount({ where, order: { id: 'DESC' }, skip: size * (page - 1), take: size })
        return ResultData.ok({
            list: classToPlain(data),
            count:total,
            page:page,
            size:size
        })
    }

    async query(id: string): Promise<ResultData>{
        const res = await this.userRep.findOne(id)
        console.log(res)
        return ResultData.ok(res)
    }
    async updateOne(dto: CreateUserDto): Promise<ResultData>{
        const res = await this.userRep.find()
        return ResultData.ok(res)
    }
    async deleteOne(id: string): Promise<ResultData>{
        const res = await this.userRep.find()
        return ResultData.ok(res)
    }
}
