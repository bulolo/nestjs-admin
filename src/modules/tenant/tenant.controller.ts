import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Result } from 'src/common/utils/result';
import { CreateTenantDto } from './dto/create.dto';
import { QueryTenantDto } from './dto/query.dto';
import { UpdateTenantDto } from './dto/update.dto';
import { TenantService } from './tenant.service';

@ApiTags('租户相关')
@Controller('v1/tenants')
export class TenantController { 
  constructor(
    private readonly tenantService: TenantService
  ) { }
  @Get()
  @ApiOperation({ summary: '查询租户列表' })
  async list(@Query() dto: QueryTenantDto): Promise<Result> {
    return 
  }

  @Post()
  @ApiOperation({ summary: '创建租户' })
  async create(@Body() dto: CreateTenantDto): Promise<Result> {
    return
  }

  @Get(':id')
  @ApiOperation({ summary: '查询租户' })
  @ApiParam({ name: 'id', description: '租户id' })
  async query(@Param('id') id): Promise<Result> {
    return
  }

  @Put(':id')
  @ApiOperation({ summary: '更新租户' })
  @ApiParam({ name: 'id', description: '租户id' })
  async update(@Param('id') id, @Body() dto: UpdateTenantDto): Promise<Result> {
    return
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除租户' })
  @ApiParam({ name: 'id', description: '租户id' })
  async delete(@Param('id') id): Promise<Result> {
    return
  }
}
