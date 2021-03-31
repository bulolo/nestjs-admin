import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator'
import { BaseQueryDto } from 'src/modules/_base/baseQuery.dto'

export class FindUsersDto extends BaseQueryDto {
    username: string
    status:number
}