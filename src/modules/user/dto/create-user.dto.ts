import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {

    @ApiProperty({ description: '用户名' })
    @IsString({ message: 'account 类型错误，正确类型 string' })
    @IsNotEmpty({ message: 'account 不能为空' })
    @MinLength(6, { message: '账号至少6个字符' })
    @MaxLength(20, { message: '账号最多20个字符' })
    username: string

    @ApiProperty({ description: '密码' })
    @IsString({ message: 'password 类型错误，正确类型 string' })
    @IsNotEmpty({ message: 'password 不能为空' })
    password: string | null

    real_name: string | null
    @ApiProperty({ description: '头像', required: false })
    @IsString({ message: 'avatar 类型错误，正确类型 string' })
    head_url: string | null

    gender: number | null

    @ApiProperty({ description: '邮箱', required: false })
    @IsString({ message: 'email 类型错误，正确类型 string' })
    @IsEmail()
    @IsOptional()
    email: string | null
    @ApiProperty({ description: '手机号', required: false })
    @IsString({ message: 'phoneNum 类型错误，正确类型 string' })
    @IsMobilePhone('zh-CN', { strictMode: false }, { message: '请输入正确的手机号' })
    mobile: string | null

    dept_id: string | null

    super_admin: number | null

    super_tenant: number | null

    status: number | null

    tenant_code: string | null
}