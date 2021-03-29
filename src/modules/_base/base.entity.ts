import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
    @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
    id: number;

    @Column("bigint", { name: "creator", nullable: true, comment: "创建者" })
    creator: string | null;

    @Column("datetime", {
        name: "created_at",
        nullable: true,
        comment: "创建时间",
    })
    created_at: Date | null;

    @Column("bigint", { name: "updater", nullable: true, comment: "更新者" })
    updater: string | null;

    @Column("datetime", {
        name: "updated_at",
        nullable: true,
        comment: "更新时间",
    })
    updated_at: Date | null;
}