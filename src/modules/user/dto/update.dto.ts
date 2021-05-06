import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator'

export class UpdateUserDto {

  @ApiProperty({ description: '用户名', default: null })
  @IsString({ message: 'username 类型错误，正确类型 string' })
  @IsNotEmpty({ message: 'username 不能为空' })
  @MinLength(6, { message: '账号至少6个字符' })
  @MaxLength(20, { message: '账号最多20个字符' })
  username: string

  // @ApiProperty({ description: '密码', default: null })
  // @IsString({ message: 'password 类型错误，正确类型 string' })
  // @IsNotEmpty({ message: 'password 不能为空' })
  // password: string | null

  @ApiProperty({ description: '真实姓名', default: null })
  @IsString({ message: 'real_name 类型错误，正确类型 string' })
  real_name: string | null

  @ApiProperty({ description: '头像', required: false, default: null })
  @IsString({ message: 'avatar 类型错误，正确类型 string' })
  head_url: string | null

  @ApiProperty({ description: '性别', required: false, default: null })
  gender: number | null

  @ApiProperty({ description: '邮箱', required: false, default: null })
  @IsString({ message: 'email 类型错误，正确类型 string' })
  @IsEmail()
  @IsOptional()
  email: string | null

  @ApiProperty({ description: '手机号', required: false, default: null })
  @IsString({ message: 'mobile 类型错误，正确类型 string' })
  @IsMobilePhone('zh-CN', { strictMode: false }, { message: '请输入正确的手机号' })
  mobile: string | null

  @ApiProperty({ description: '部门ID', default: null,required: false })
  // @IsString({ message: '类型错误，正确类型 string' })
  dept_id: number | null

}