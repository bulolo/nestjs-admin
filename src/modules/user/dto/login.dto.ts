import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator'
import { BaseQueryDto } from 'src/modules/_base/baseQuery.dto'

export class LoginUserDto {

  @ApiProperty({ description: '用户名', required: true })
  username: string

  @ApiProperty({ description: '密码', required: true })
  password: string
}