import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt'
import { genSalt, hash, compare } from 'bcrypt'
import { Result } from 'src/common/utils/result';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) { }
  
  // 登录
  async login(account: string, password: string): Promise<Result> {
    const user = await this.userService.findOneByUsername(account)
    if (!user) return Result.fail(HttpStatus.NOT_FOUND, '账号或密码错误')
    const checkPassword = await compare(password, user.password)
    if (!checkPassword) return Result.fail(HttpStatus.NOT_FOUND, '账号或密码错误')
    // 生成 token
    const data = this.genToken({ id: user.id })
    return Result.ok(data)
  }
  // 生成 token
  genToken(payload: { id: number }): Record<string, unknown> {
    const accessToken = `Bearer ${this.jwtService.sign(payload)}`
    const refreshToken = this.jwtService.sign(payload, { expiresIn: this.config.get('jwt.refreshExpiresIn') })
    return { accessToken, refreshToken }
  }
  // 刷新 token
  refreshToken(id: number): string {
    return this.jwtService.sign({ id })
  }

  // 校验 token
  verifyToken(token: string): number {
    try {
      if (!token) return 0
      const id = this.jwtService.verify(token.replace('Bearer ', ''))
      return id
    } catch (error) {
      return 0
    }
  }
  async validateUserByJwt(payload: { id: number }): Promise<UserEntity> {
    return await this.userService.findOneById(payload.id)
  }
}
