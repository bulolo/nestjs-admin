import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator'

export class UpdateUserDto {


  @ApiProperty({ description: '用户名', required: false, default: null })
  @IsString({ message: 'username 类型错误，正确类型 string' })
  @IsNotEmpty({ message: 'username 不能为空' })
  @MinLength(6, { message: 'username至少6个字符' })
  @MaxLength(20, { message: 'username最多20个字符' })
  username: string

  @ApiProperty({ description: '密码', required: false, default: null })
  @IsString({ message: 'password 类型错误，正确类型 string' })
  password: string | null

  @ApiProperty({ description: '真实姓名', required: false, default: null })
  @IsString({ message: 'real_name 类型错误，正确类型 string' })
  real_name: string | null

  @ApiProperty({ description: '头像', required: false, default: null })
  // @IsString({ message: 'avatar 类型错误，正确类型 string' })
  head_url: string | null

  @ApiProperty({ description: '性别', required: false, default: null })
  gender: number | null

  @ApiProperty({ description: '邮箱', required: false, default: null })
  @IsString({ message: 'email 类型错误，正确类型 string' })
  @IsEmail({}, { message: 'email 必须为邮箱地址' })
  @IsOptional()
  email: string | null

  @ApiProperty({ description: '手机号', required: false, default: null })
  @IsString({ message: 'mobile 类型错误，正确类型 string' })
  @IsMobilePhone('zh-CN', { strictMode: false }, { message: '请输入正确的手机号' })
  mobile: string | null

  @ApiProperty({ description: '部门ID', default: null, required: false })
  // @IsString({ message: '类型错误，正确类型 string' })
  dept_id: number | null


  @ApiProperty({ description: '确认密码', required: false })
  @IsString({ message: ' confirmPassword 类型错误，正确类型 string' })
  @IsOptional()
  readonly confirmPassword?: string

}