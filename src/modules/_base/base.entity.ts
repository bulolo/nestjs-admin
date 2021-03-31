import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'

export class BaseEntity {
    @ApiProperty({ type: Number, description: 'id' })
    @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
    id: string;

    @ApiProperty({ type: Number, description: '创建者' })
    @Column("bigint", { name: "creator", nullable: true, comment: "创建者" })
    creator: string | null;

    @ApiProperty({ type: Date, description: '创建时间' })
    @Column("datetime", {
        name: "created_at",
        nullable: true,
        comment: "创建时间",
    })
    created_at: Date | null;

    @ApiProperty({ type: Number, description: '更新者' })
    @Column("bigint", { name: "updater", nullable: true, comment: "更新者" })
    updater: string | null;

    @ApiProperty({ type: Date, description: '更新时间' })
    @Column("datetime", {
        name: "updated_at",
        nullable: true,
        comment: "更新时间",
    })
    updated_at: Date | null;
}