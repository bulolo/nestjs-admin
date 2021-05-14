import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Permissions } from 'src/common/decorator/permissions.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Result } from 'src/common/utils/result';
import { CreatePostDto } from './dto/create-post.dto';
import { QueryPostDto } from './dto/query-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';


@ApiTags('岗位相关')
@Controller('v1/posts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PostController {

  constructor(
    private readonly postService: PostService
  ) { }

  @Get()
  @ApiOperation({ summary: '查询岗位列表' })
  @Permissions('sys:post:list')
  async list(@Query() dto: QueryPostDto): Promise<Result> {
    const res = await this.postService.page(dto)
    return Result.ok(res)
  }

  @Post()
  @ApiOperation({ summary: '创建岗位' })
  @Permissions('sys:post:add')
  async create(@Body() dto: CreatePostDto): Promise<Result> {
    const res = await this.postService.create(dto)
    return Result.ok(res)
  }


  @Get(':id')
  @ApiOperation({ summary: '查询岗位' })
  @ApiParam({ name: 'id', description: '岗位id' })
  @Permissions('sys:post:info')
  async query(@Param('id', new ParseIntPipe()) id): Promise<Result> {
    const res = await this.postService.findById(id)
    return Result.ok(res)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新岗位' })
  @ApiParam({ name: 'id', description: '岗位id' })
  @Permissions('sys:post:update')
  async update(@Body() dto: UpdatePostDto): Promise<Result> {
    const res = await this.postService.updateById(dto)
    return Result.ok(res)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除岗位' })
  @ApiParam({ name: 'id', description: '岗位id' })
  @Permissions('sys:post:delete')
  async delete(@Param('id', new ParseIntPipe()) id): Promise<Result> {
    const res = await this.postService.deleteById(id)
    return Result.ok(res)
  }


}
