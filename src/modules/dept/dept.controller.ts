import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Result } from 'src/common/utils/result';
import { Permissions } from 'src/common/decorator/permissions.decorator'
import { DeptService } from './dept.service';
import { CreateDeptDto } from './dto/create-dept.dto';
import { QueryDeptDto } from './dto/query-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';

@ApiTags('部门相关')
@Controller('v1/depts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DeptController {
  constructor(
    private readonly deptService: DeptService
  ) { }
  @Get()
  @ApiOperation({ summary: '查询部门列表' })
  @Permissions('sys:dept:list')
  async list(@Query() dto: QueryDeptDto): Promise<Result> {
    const res = await this.deptService.page(dto)
    return Result.ok(res)
  }

  @Post()
  @ApiOperation({ summary: '创建部门' })
  @Permissions('sys:dept:add')
  async create(@Body() dto: CreateDeptDto): Promise<Result> {
    const res = await this.deptService.create(dto)
    return Result.ok(res)
  }


  @Get(':id')
  @ApiOperation({ summary: '查询部门' })
  @ApiParam({ name: 'id', description: '部门id' })
  @Permissions('sys:dept:info')
  async query(@Param('id', new ParseIntPipe()) id): Promise<Result> {
    const res = await this.deptService.findById(id)
    return Result.ok(res)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新部门' })
  @ApiParam({ name: 'id', description: '部门id' })
  @Permissions('sys:dept:update')
  async update(@Body() dto: UpdateDeptDto): Promise<Result> {
    const res = await this.deptService.updateById(dto)
    return Result.ok(res)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除部门' })
  @ApiParam({ name: 'id', description: '部门id' })
  @Permissions('sys:dept:delete')
  async delete(@Param('id', new ParseIntPipe()) id): Promise<Result> {
    const res = await this.deptService.deleteById(id)
    return Result.ok(res)
  }
}
