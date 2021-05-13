import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { Like, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { QueryPostDto } from './dto/query-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,
    private readonly config: ConfigService,
  ) { }

  // 创建
  async create(dto: CreatePostDto): Promise<Record<string, any>> {
    const data = plainToClass(PostEntity, { status: 1, ...dto }, { ignoreDecorators: true })
    const res = await this.postRepo.save(data)
    return res
  }

  // 分页列表查找
  async page(dto: QueryPostDto): Promise<Record<string, any>> {
    const { page = 1, size = 10, post_name } = dto
    const where = {
      ...(post_name ? { post_name: Like(`%${post_name}%`) } : null),
    }
    const [result, total] = await this.postRepo.findAndCount({
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
    let findOne = await this.postRepo.findOne(id)
    if (!findOne) {
      throw new NotFoundException()
    }
    return classToPlain(findOne)
  }

  // 根据ID更新
  async updateById(dto: UpdatePostDto): Promise<Record<string, any>> {
    await this.findById(dto.id)
    await this.postRepo.update(dto.id, dto)
    return classToPlain(await this.findById(dto.id))
  }

  // 根据ID删除
  async deleteById(id: number): Promise<Record<string, any>> {
    await this.findById(id)
    const res = await this.postRepo.softDelete(id)
    return res
  }
}
