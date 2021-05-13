import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Permissions } from 'src/common/decorator/permissions.decorator'
import { MenuService } from './menu.service';
import { Result } from 'src/common/utils/result';
import { QueryMenuDto } from './dto/query-menu.dto';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@ApiTags('菜单相关')
@Controller('v1/menus')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MenuController {
  constructor(
    private readonly menuService: MenuService
  ) { }
  @Get()
  @ApiOperation({ summary: '查询菜单列表' })
  @Permissions('sys:menu:list')
  async list(@Query() dto: QueryMenuDto): Promise<Result> {
    const res = await this.menuService.page(dto)
    return Result.ok(res)
  }

  @Post()
  @ApiOperation({ summary: '创建菜单' })
  @Permissions('sys:menu:add')
  async create(@Body() dto: CreateMenuDto): Promise<Result> {
    const res = await this.menuService.create(dto)
    return Result.ok(res)
  }


  @Get(':id')
  @ApiOperation({ summary: '查询菜单' })
  @ApiParam({ name: 'id', description: '菜单id' })
  @Permissions('sys:menu:info')
  async query(@Param('id', new ParseIntPipe()) id): Promise<Result> {
    const res = await this.menuService.findById(id)
    return Result.ok(res)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新菜单' })
  @ApiParam({ name: 'id', description: '菜单id' })
  @Permissions('sys:menu:update')
  async update(@Body() dto: UpdateMenuDto): Promise<Result> {
    const res = await this.menuService.updateById(dto)
    return Result.ok(res)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除菜单' })
  @ApiParam({ name: 'id', description: '菜单id' })
  @Permissions('sys:menu:delete')
  async delete(@Param('id', new ParseIntPipe()) id): Promise<Result> {
    const res = await this.menuService.deleteById(id)
    return Result.ok(res)
  }
}
