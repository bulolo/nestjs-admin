import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateRoleDto {
  
  @ApiProperty({ description: '名称', required: false })
  name: string

  @ApiProperty({ description: '部门ID', required: false })
  dept_id: number

  @ApiProperty({ description: '备注', required: false })
  remark: number

}