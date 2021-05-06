import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator'
import { BasePageDto } from 'src/modules/_base/basePage.dto'

export class QueryTenantDto extends BasePageDto {

}