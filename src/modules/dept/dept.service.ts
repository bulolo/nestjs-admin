import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { Like, Repository } from 'typeorm';
import { DeptEntity } from './dept.entity';
import { CreateDeptDto } from './dto/create-dept.dto';
import { QueryDeptDto } from './dto/query-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(DeptEntity)
    private readonly deptRepo: Repository<DeptEntity>,
    private readonly config: ConfigService,
  ) { }

  // 创建
  async create(dto: CreateDeptDto): Promise<Record<string, any>> {
    const data = plainToClass(DeptEntity, dto, { ignoreDecorators: true })
    const res = await this.deptRepo.save(data)
    return res
  }

  // 分页列表查找
  async page(dto: QueryDeptDto): Promise<Record<string, any>> {
    const { page = 1, size = 10, name } = dto
    const where = {
      ...(name ? { name: Like(`%${name}%`) } : null),
    }
    const [result, total] = await this.deptRepo.findAndCount({
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
    let findOne = await this.deptRepo.findOne(id)
    if (!findOne) {
      throw new NotFoundException()
    }
    return classToPlain(findOne)
  }

  // 根据ID更新
  async updateById(dto: UpdateDeptDto): Promise<Record<string, any>> {
    await this.findById(dto.id)
    await this.deptRepo.update(dto.id, dto)
    return classToPlain(await this.findById(dto.id))
  }

  // 根据ID删除
  async deleteById(id: number): Promise<Record<string, any>> {
    await this.findById(id)
    const res = await this.deptRepo.softDelete(id)
    return res
  }

}
