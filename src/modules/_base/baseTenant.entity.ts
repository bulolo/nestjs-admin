import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

export class BaseTenantEntity extends BaseEntity{
    @Column("bigint", {
        name: "tenant_code",
        nullable: true,
        comment: "租户编码",
    })
    tenant_code: string | null;
}