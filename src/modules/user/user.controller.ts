import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController { 
  constructor(
    private readonly userService:UserService
  ){}
  @Get()
  async findAll(@Query() query): Promise<UserEntity[]> {
    const users = await this.userService.findMany()
    return users
    // throw new ForbiddenException()
  }
  @Post()
  async create(@Body() body): Promise<UserEntity> {
    const user = new UserEntity();
    user.username = "Timber";
    user.real_name = "Saw";
    return await this.userService.saveOne(user)
  }
  @Get(':id')
  async findOne(@Param('id') id): Promise<UserEntity> {
    const user = await this.userService.findOne({id:1})
    return user
  }

}
