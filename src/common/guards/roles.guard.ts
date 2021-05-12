
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('RolesGuard', user)
    // 当前请求所需权限
    const currentPerm = this.reflector.get<string>('permissions', context.getHandler());
    console.log('当前所需权限:', currentPerm)
    // 标识不需要权限
    if (!currentPerm) {
      return true;
    }
    // 根据用户id 查询所拥有的权限
    // const permList = await this.permSerivce.findUserPerms(user.id)
    // const perms: string[] = []
    // for (let i = 0, len = permList.length; i < len; i++) {
    //   permList[i]['m_perms'].indexOf(',') > -1 ? perms.push(...permList[i]['m_perms'].split(',')) : perms.push(permList[i]['m_perms'])
    // }
    //  匹配权限
    // if (perms.includes(currentPerm)) return true
    // throw new ForbiddenException()
    return true
  }
}
