import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import { Like, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { QueryRoleDto } from './dto/query-role.dto';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleService { 
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
    private readonly config: ConfigService,
  ) { }

  // 分页列表查找
  async page(dto: QueryRoleDto): Promise<Record<string, any>> {
    const { page = 1, size = 10, name } = dto
    const where = {
      ...(name ? { username: Like(`%${name}%`) } : null),
    }
    const [result, total] = await this.roleRepo.findAndCount({
      where,
      order: { created_at: 'DESC' },
      skip: size * (page - 1),
      take: size
    })
    return {
      list: classToPlain(result),
      page: page,
      size: size,
      count: total,
    }
  }
}
