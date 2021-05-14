import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateDeptDto {
  
  @ApiProperty({ description: '名称', required: true })
  @IsString({ message: 'name 类型错误，正确类型 string' })
  name: string

  @ApiProperty({ description: '上级ID', required: true })
  @IsNumber({}, { message: 'pid 类型错误，正确类型 number' })
  pid: number

  @ApiProperty({ description: '排序', required: false })
  @IsNumber({}, { message: 'sort 类型错误，正确类型 number' })
  sort: number
}