import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Result } from 'src/common/utils/result';
import { CreateUserDto } from '../user/dto/create.dto';
import { LoginUserDto } from '../user/dto/login.dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@ApiTags('登录注册')
@Controller('v1/auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  @ApiOkResponse({ type: UserEntity })
  async create(@Body() user: CreateUserDto): Promise<Result> {
    console.log('user', user)
    const res = await this.userService.create(user)
    return Result.ok(res)
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  async login(@Body() dto: LoginUserDto): Promise<Result> {
    const res = await this.userService.login(dto.account, dto.password)
    return Result.ok(res)
  }
}
