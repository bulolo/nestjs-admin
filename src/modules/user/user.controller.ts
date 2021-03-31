import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Result } from 'src/common/utils/result';
import { CreateUserDto } from './dto/create.dto';
import { QueryUserDto } from './dto/query.dto';
import { UpdateUserDto } from './dto/update.dto';
import { UserService } from './user.service';

@ApiTags('用户账号相关')
@Controller('v1/users')
export class UserController { 
  constructor(
    private readonly userService:UserService
){}

  @Get()
  @ApiOperation({ summary: '查询用户列表' })
  async list(@Query() dto: QueryUserDto): Promise<Result> {
    const users = await this.userService.findUsers(dto)
    return users
    // throw new ForbiddenException()
  }

  @Post()
  @ApiOperation({ summary: '创建用户' })
  async create(@Body() dto:CreateUserDto): Promise<Result> {
    return await this.userService.createUser(dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询用户' })
  @ApiParam({name: 'id',description: '用户id'})
  async query(@Param('id') id): Promise<Result> {
    const user = await this.userService.findUserById(id)
    return user
  }

  @Put(':id')
  @ApiOperation({ summary: '更新用户' })
  @ApiParam({ name: 'id', description: '用户id' })
  async update(@Param('id') id, @Body() dto: UpdateUserDto): Promise<Result> {
    const user = await this.userService.updateUserById(id,dto)
    return user
  }
  
  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiParam({ name: 'id', description: '用户id' })
  async delete(@Param('id') id): Promise<Result> {
    const user = await this.userService.deleteUserById(id)
    return user
  }
}
