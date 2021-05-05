
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    ) {
    super()
  }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const res = context.switchToHttp().getResponse()
    try {
      const accessToken = req.get('Authorization')
      if (!accessToken) throw new UnauthorizedException('请先登录')

      const atUserId = this.authService.verifyToken(accessToken)
      if (atUserId) return this.activate(context)
      console.log(req.user)
      const refreshToken = req.get('RefreshToken')
      const rtUserId = this.authService.verifyToken(refreshToken)
      if (!rtUserId) throw new UnauthorizedException('当前登录已过期，请重新登录')
      const user = await this.userService.findOneById(rtUserId)
      if (user) {
        const tokens = this.authService.genToken({ id: rtUserId })
        // request headers 对象 prop 属性全自动转成小写，
        // 所以 获取 request.headers['authorization'] 或 request.get('Authorization')
        // 重置属性 request.headers[authorization] = value
        req.headers['authorization'] = tokens.accessToken
        req.headers['refreshtoken'] = tokens.refreshToken
        // 在响应头中加入新的token，客户端判断响应头有无 Authorization 字段，有则重置
        res.header('Authorization', tokens.accessToken)
        res.header('RefreshToken', tokens.refreshToken)
        // 将当前请求交给下一级
        return this.activate(context)
      } else {
        throw new UnauthorizedException('用户不存在')
      }
    } catch (error) {
      // Logger
      return false
    }
  }

  async activate(context: ExecutionContext): Promise<boolean> {
    return super.canActivate(context) as Promise<boolean>
  }
}
