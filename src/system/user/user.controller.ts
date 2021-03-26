import { Body, Controller, Get,Headers,Param, Post, Query } from '@nestjs/common';
import { ForbiddenException } from 'src/common/exception/forbidden.exception';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get()
    async findAll(@Query() query): Promise<string> {
        return query
        // throw new ForbiddenException()
    }
    @Post()
    async create(@Body() body): Promise<string> {
        return body
    }
    @Get(':id')
    async findOne(@Param('id') id): Promise<string> {
        return `This action returns a #${id} cat`;
    }
}
