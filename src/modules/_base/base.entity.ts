import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer';

export class BaseEntity {
    @ApiProperty({ type: Number, description: 'id' })
    @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
    id: number;

    @ApiProperty({ type: Number, description: '创建者' })
    @Column("bigint", { name: "creator", nullable: true, comment: "创建者" })
    creator: number | null;

    @ApiProperty({ type: Date, description: '创建时间' })
    @CreateDateColumn({
      type: 'datetime',
      name: 'created_at',
      comment: '创建时间',
    })
    created_at: Date | null;

    @ApiProperty({ type: Number, description: '更新者' })
    @Column("bigint", { name: "updater", nullable: true, comment: "更新者" })
    updater: number | null;

    @ApiProperty({ type: Date, description: '更新时间' })
    @UpdateDateColumn({
      type: 'datetime',
      name: 'updated_at',
      comment: '更新时间',
    })
    updated_at: Date | null;

    @Exclude()
    @DeleteDateColumn({
      type: 'datetime',
      name: 'deleted_at',
      comment: '删除',
    })
    deleted_at: Date;
}