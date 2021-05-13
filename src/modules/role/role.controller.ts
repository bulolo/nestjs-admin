import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Result } from 'src/common/utils/result';
import { CreateRoleDto } from './dto/create-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleService } from './role.service';
import { Permissions } from 'src/common/decorator/permissions.decorator'

@ApiTags('角色相关')
@Controller('v1/roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RoleController {
  constructor(
    private readonly roleService: RoleService
  ) { }
  @Get()
  @ApiOperation({ summary: '查询角色列表' })
  @Permissions('sys:role:list')
  async list(@Query() dto: QueryRoleDto): Promise<Result> {
    const res = await this.roleService.page(dto)
    return Result.ok(res)
  }

  @Post()
  @ApiOperation({ summary: '创建角色' })
  @Permissions('sys:role:add')
  async create(@Body() dto: CreateRoleDto): Promise<Result> {
    const res = await this.roleService.create(dto)
    return Result.ok(res)
  }


  @Get(':id')
  @ApiOperation({ summary: '查询角色' })
  @ApiParam({ name: 'id', description: '角色id' })
  @Permissions('sys:role:info')
  async query(@Param('id', new ParseIntPipe()) id): Promise<Result> {
    const res = await this.roleService.findById(id)
    return Result.ok(res)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新角色' })
  @ApiParam({ name: 'id', description: '角色id' })
  @Permissions('sys:role:update')
  async update(@Param('id', new ParseIntPipe()) id, @Body() dto: UpdateRoleDto): Promise<Result> {
    const res = await this.roleService.updateById(id, dto)
    return Result.ok(res)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除角色' })
  @ApiParam({ name: 'id', description: '角色id' })
  @Permissions('sys:role:delete')
  async delete(@Param('id', new ParseIntPipe()) id): Promise<Result> {
    const res = await this.roleService.deleteById(id)
    return Result.ok(res)
  }
}
