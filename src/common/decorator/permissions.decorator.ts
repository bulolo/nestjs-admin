// import { applyDecorators, SetMetadata } from '@nestjs/common';
// export const Permissions = (permissions: string) => SetMetadata('permissions', permissions);


import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { RolesGuard } from "../guards/roles.guard";
export function Permissions(permissions: string): Function {
  // 可定义‘组合装饰器’
  return applyDecorators(
    SetMetadata('permissions', permissions)
  )
}