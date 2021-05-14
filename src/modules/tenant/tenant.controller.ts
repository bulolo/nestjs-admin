import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Result } from 'src/common/utils/result';
import { CreateTenantDto } from './dto/create.dto';
import { QueryTenantDto } from './dto/query.dto';
import { UpdateTenantDto } from './dto/update.dto';
import { TenantService } from './tenant.service';
import { Permissions } from 'src/common/decorator/permissions.decorator'

@ApiTags('租户相关')
@Controller('v1/tenants')
export class TenantController { 
  constructor(
    private readonly tenantService: TenantService
  ) { }
  @Get()
  @ApiOperation({ summary: '查询租户列表' })
  @Permissions('sys:tenant:list')
  async list(@Query() dto: QueryTenantDto): Promise<Result> {
    const res = await this.tenantService.page(dto)
    return Result.ok(res)
  }

  @Post()
  @ApiOperation({ summary: '创建租户' })
  @Permissions('sys:tenant:add')
  async create(@Body() dto: CreateTenantDto): Promise<Result> {
    const res = await this.tenantService.create(dto)
    return Result.ok(res)
  }


  @Get(':id')
  @ApiOperation({ summary: '查询租户' })
  @ApiParam({ name: 'id', description: '租户id' })
  @Permissions('sys:tenant:info')
  async query(@Param('id', new ParseIntPipe()) id): Promise<Result> {
    const res = await this.tenantService.findById(id)
    return Result.ok(res)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新租户' })
  @ApiParam({ name: 'id', description: '租户id' })
  @Permissions('sys:tenant:update')
  async update(@Body() dto: UpdateTenantDto): Promise<Result> {
    const res = await this.tenantService.updateById(dto)
    return Result.ok(res)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除租户' })
  @ApiParam({ name: 'id', description: '租户id' })
  @Permissions('sys:tenant:delete')
  async delete(@Param('id', new ParseIntPipe()) id): Promise<Result> {
    const res = await this.tenantService.deleteById(id)
    return Result.ok(res)
  }
}
