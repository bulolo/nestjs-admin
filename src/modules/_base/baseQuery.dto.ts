import { ApiProperty } from '@nestjs/swagger'

export class BaseQueryDto {
  @ApiProperty({ description: '显示页数', minimum: 1, default: 1, required: false})
  page: number

  @ApiProperty({ description: '每页显示条数', minimum: 1, default: 10, required: false})
  size: number
}
