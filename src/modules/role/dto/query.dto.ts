import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator'
import { BaseQueryDto } from 'src/modules/_base/baseQuery.dto'

export class QueryRoleDto extends BaseQueryDto{

}