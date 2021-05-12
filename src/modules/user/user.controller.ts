import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Result } from 'src/common/utils/result';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { Permissions } from 'src/common/decorator/permissions.decorator'


@ApiTags('用户相关')
@Controller('v1/users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get()
  @ApiOperation({ summary: '查询用户列表' })
  // @Permissions('sys:user:list')
  async list(@Query() dto: QueryUserDto): Promise<Result> {
    console.log(dto)
    const res = await this.userService.page(dto)
    return Result.ok(res)
  }

  @Post()
  @ApiOperation({ summary: '创建用户' })
  async create(@Body() dto: CreateUserDto): Promise<Result> {
    const res = await this.userService.create(dto)
    return Result.ok(res)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询用户' })
  @ApiParam({ name: 'id', description: '用户id' })
  async query(@Param('id', new ParseIntPipe()) id): Promise<Result> {
    const user = await this.userService.findById(id)
    return Result.ok(user)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新用户' })
  @ApiParam({ name: 'id', description: '用户id' })
  async update(@Param('id', new ParseIntPipe()) id, @Body() dto: UpdateUserDto): Promise<Result> {
    const user = await this.userService.updateById(id, dto)
    return Result.ok(user)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiParam({ name: 'id', description: '用户id' })
  async delete(@Param('id', new ParseIntPipe()) id): Promise<Result> {
    const user = await this.userService.deleteById(id)
    return Result.ok(user)
  }
}
