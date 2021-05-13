import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { Like, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
    private readonly config: ConfigService,
  ) { }

  // 创建
  async create(dto: CreateRoleDto): Promise<Record<string, any>> {
    const data = plainToClass(RoleEntity, dto, { ignoreDecorators: true })
    const res = await this.roleRepo.save(data)
    return res
  }

  // 分页列表查找
  async page(dto: QueryRoleDto): Promise<Record<string, any>> {
    const { page = 1, size = 10, name } = dto
    const where = {
      ...(name ? { name: Like(`%${name}%`) } : null),
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

  // 根据ID查找
  async findById(id: number): Promise<Record<string, any>> {
    let findOne = await this.roleRepo.findOne(id)
    if (!findOne) {
      throw new NotFoundException()
    }
    return classToPlain(findOne)
  }

  // 根据ID更新
  async updateById(id: number, dto: UpdateRoleDto): Promise<Record<string, any>> {
    const existing = await this.findById(id)
    await this.roleRepo.update(id, existing)
    return classToPlain(await this.findById(id))
  }

  // 根据ID删除
  async deleteById(id: number): Promise<Record<string, any>> {
    await this.findById(id)
    const res = await this.roleRepo.softDelete(id)
    return res
  }

}
