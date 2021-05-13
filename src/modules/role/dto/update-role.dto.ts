import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator'

export class UpdateRoleDto {
  
  @ApiProperty({ description: 'id' })
  @IsNumber({}, { message: 'id 类型错误，正确类型 number' })
  @IsNotEmpty({ message: 'id 不能为空' })
  id: number

  @ApiProperty({ description: '名称', required: false })
  name: string

  @ApiProperty({ description: '部门ID', required: false })
  dept_id: number

  @ApiProperty({ description: '备注', required: false })
  remark: number
  
}