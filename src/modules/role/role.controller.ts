import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Result } from 'src/common/utils/result';
import { UserService } from '../user/user.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleService } from './role.service';

@ApiTags('角色相关')
@Controller('v1/roles')
export class RoleController { 
  constructor(
    private readonly roleService: RoleService,userService:UserService
  ) { }
  @Get()
  @ApiOperation({ summary: '查询角色列表' })
  async list(@Query() dto: QueryRoleDto): Promise<Result> {
    const res = await this.roleService.page(dto)
    return Result.ok(res)
  }

  @Post()
  @ApiOperation({ summary: '创建角色' })
  async create(@Body() dto: CreateRoleDto): Promise<Result> {
    return
  }

  @Get(':id')
  @ApiOperation({ summary: '查询角色' })
  @ApiParam({ name: 'id', description: '角色id' })
  async query(@Param('id') id): Promise<Result> {
    return
  }

  @Put(':id')
  @ApiOperation({ summary: '更新角色' })
  @ApiParam({ name: 'id', description: '角色id' })
  async update(@Param('id') id, @Body() dto: UpdateRoleDto): Promise<Result> {
    return
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除角色' })
  @ApiParam({ name: 'id', description: '角色id' })
  async delete(@Param('id') id): Promise<Result> {
    return
  }
}
