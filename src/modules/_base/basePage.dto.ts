import { ApiProperty } from '@nestjs/swagger'

export class BasePageDto {
  @ApiProperty({ description: '显示页数', minimum: 0, default: 1, required: false })
  page: number

  @ApiProperty({ description: '每页显示条数', minimum: 0, default: 10, required: false })
  size: number

  sort?: string
  order?: string
}
