import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get()
    async findAll(): Promise<string> {
        return await this.userService.getHello();
    }
    @Post()
    async create(): Promise<string> {
        return await this.userService.getHello();
    }
    @Get(':id')
    async findOne(@Param('id') id): Promise<string> {
        return `This action returns a #${id} cat`;
    }
}
