import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Result } from 'src/common/utils/result';
import { DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@ApiTags('用户账号相关')
@Controller('v1/users')
export class UserController { 
  constructor(
    private readonly userService:UserService
  ){}

  @Get()
  @ApiOperation({ summary: '查询用户列表' })
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async list(@Query() dto: FindUsersDto): Promise<Result> {
    const users = await this.userService.findUsers(dto)
    return users
    // throw new ForbiddenException()
  }

  @Post()
  @ApiOperation({ summary: '创建用户' })
  @ApiOkResponse({ type: UserEntity })
  async create(@Body() dto:CreateUserDto): Promise<Result> {
    return await this.userService.createUser(dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询用户' })
  @ApiOkResponse({ type: UserEntity })
  async query(@Param('id') id): Promise<Result> {
    const user = await this.userService.findUserById(id)
    return user
  }

  @Put(':id')
  @ApiOperation({ summary: '更新用户' })
  @ApiOkResponse({ type: UserEntity })
  async update(@Param('id') id, @Body() dto: CreateUserDto): Promise<Result> {
    const user = await this.userService.updateUserById(id,dto)
    return user
  }
  
  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiOkResponse({ type: UserEntity })
  async delete(@Param('id') id): Promise<Result> {
    const user = await this.userService.deleteUserById(id)
    return user
  }
}
