import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateTenantDto } from './dto/create.dto';
import { QueryTenantDto } from './dto/query.dto';
import { UpdateTenantDto } from './dto/update.dto';
import { TenantEntity } from './tenant.entity';

@Injectable()
export class TenantService { 
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepo: Repository<TenantEntity>,
    private readonly config: ConfigService,
  ) { }

  // 创建
  async create(dto: CreateTenantDto): Promise<Record<string, any>> {
    const data = plainToClass(TenantEntity, dto, { ignoreDecorators: true })
    const res = await this.tenantRepo.save(data)
    return res
  }

  // 分页列表查找
  async page(dto: QueryTenantDto): Promise<Record<string, any>> {
    const { page = 1, size = 10 } = dto
    const where = {
      // ...(name ? { name: Like(`%${name}%`) } : null),
    }
    const [result, total] = await this.tenantRepo.findAndCount({
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
    let findOne = await this.tenantRepo.findOne(id)
    if (!findOne) {
      throw new NotFoundException()
    }
    return classToPlain(findOne)
  }

  // 根据ID更新
  async updateById(dto: UpdateTenantDto): Promise<Record<string, any>> {
    await this.findById(dto.id)
    await this.tenantRepo.update(dto.id, dto)
    return classToPlain(await this.findById(dto.id))
  }

  // 根据ID删除
  async deleteById(id: number): Promise<Record<string, any>> {
    await this.findById(id)
    const res = await this.tenantRepo.softDelete(id)
    return res
  }

}
