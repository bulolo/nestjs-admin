import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { Result } from 'src/common/utils/result';
import { CreateUserDto } from './dto/create.dto';
import { QueryUserDto } from './dto/query.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { RedisService } from 'nestjs-redis';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRep: Repository<UserEntity>,
        private readonly redisService: RedisService
    ) {}

    createUser = async (dto: CreateUserDto): Promise<Result> => {
        const user = plainToClass(UserEntity, dto)
        const res = await this.userRep.save(user)
        return Result.ok(res)
    }

    findUsers = async (dto: QueryUserDto) :Promise<Result> => {
        const { page = 1, size = 10, username, status } = dto
        const where = {
            ...(status ? { status } : null),
            ...(username ? { username: Like(`%${username}%`) } : null),
        }
        const [result,total] = await this.userRep.findAndCount({ where, order: { id: 'DESC' }, skip: size * (page - 1), take: size })
        return Result.ok({
            list: classToPlain(result),
            count:total,
            page:page,
            size:size
        })
    }

    findUserById  = async (id: number): Promise<Result> => {
        const res = await this.userRep.findOne(id)
        if (!res) {
          throw new NotFoundException()
        }
        return Result.ok(res)
    }

    updateUserById = async (id: number, dto: CreateUserDto): Promise<Result> => {
      await this.findUserById(id)
      let updateResult = 1
      const user = plainToClass(UserEntity, dto)
      const res = await this.userRep.update(id, user).catch(e => updateResult = 0);
      return Result.ok(updateResult)
    }
    
    deleteUserById = async (id: number): Promise<Result> => {
        await this.findUserById(id)
        const res = await this.userRep.softDelete(id)
        return Result.ok(res)
    }
}
