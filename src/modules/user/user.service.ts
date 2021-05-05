import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './user.entity';
import { Result } from 'src/common/utils/result';
import { CreateUserDto } from './dto/create.dto';
import { QueryUserDto } from './dto/query.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { RedisService } from 'nestjs-redis';
import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRep: Repository<UserEntity>,
        private readonly redisService: RedisService,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
    ) {}

   
    async createUser (dto: CreateUserDto): Promise<UserEntity>{
        const user = plainToClass(UserEntity, dto)
        const res = await this.userRep.save(user)
        return res
    }

    async findUsers (dto: QueryUserDto) :Promise<Result>  {
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

    async findOneById (id: number): Promise<UserEntity> {
        const res = await this.userRep.findOne(id)
        if (!res) {
          throw new NotFoundException()
        }
        return res
    }
    async updateOneById(id: number, dto: CreateUserDto): Promise<number> {
      await this.findOneById(id)
      let updateResult = 1
      const user = plainToClass(UserEntity, dto)
      const res = await this.userRep.update(id, user).catch(e => updateResult = 0);
      return updateResult
    }
    
    async deleteOneById (id: number): Promise<UpdateResult>  {
      await this.findOneById(id)
        const res = await this.userRep.softDelete(id)
        return res
    }
    async findOneByUsername(username: string): Promise<UserEntity> {
      return await this.userRep.findOne({ username })
    }
}
