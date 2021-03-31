import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { BaseService } from 'src/modules/_base/base.service';
import { UserEntity } from './user.entity';
import { Result } from 'src/common/utils/result';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { ForbiddenException } from 'src/common/exception/forbidden.exception';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRep: Repository<UserEntity>
    ) {}

    createUser = async (dto: CreateUserDto): Promise<Result> => {
        const user = plainToClass(UserEntity, dto)
        const res = await this.userRep.save(user)
        return Result.ok(res)
    }

    findUsers = async (dto: FindUsersDto) :Promise<Result> => {
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
