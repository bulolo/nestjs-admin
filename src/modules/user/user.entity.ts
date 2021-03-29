import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../_base/base.entity";
import { BaseTenantEntity } from "../_base/baseTenant.entity";

@Index("uk_username", ["username"], { unique: true })
@Index("idx_create_date", ["created_at"], {})
@Entity("sys_user", { schema: "race_nestjs_admin" })
export class UserEntity extends BaseTenantEntity {
    
    @Column("varchar", {
        name: "username",
        unique: true,
        comment: "用户名",
        length: 50,
    })
    username: string;

    @Column("varchar", {
        name: "password",
        nullable: true,
        comment: "密码",
        length: 100,
    })
    password: string | null;

    @Column("varchar", {
        name: "real_name",
        nullable: true,
        comment: "姓名",
        length: 50,
    })
    real_name: string | null;

    @Column("varchar", {
        name: "head_url",
        nullable: true,
        comment: "头像",
        length: 200,
    })
    head_url: string | null;

    @Column("tinyint", {
        name: "gender",
        nullable: true,
        comment: "性别   0：男   1：女    2：保密",
        unsigned: true,
    })
    gender: number | null;

    @Column("varchar", {
        name: "email",
        nullable: true,
        comment: "邮箱",
        length: 100,
    })
    email: string | null;

    @Column("varchar", {
        name: "mobile",
        nullable: true,
        comment: "手机号",
        length: 100,
    })
    mobile: string | null;

    @Column("bigint", { name: "dept_id", nullable: true, comment: "部门ID" })
    dept_id: string | null;

    @Column("tinyint", {
        name: "super_admin",
        nullable: true,
        comment: "超级管理员   0：否   1：是",
        unsigned: true,
    })
    super_admin: number | null;

    @Column("tinyint", {
        name: "super_tenant",
        nullable: true,
        comment: "租户管理员   0：否   1：是",
        unsigned: true,
    })
    super_tenant: number | null;

    @Column("tinyint", {
        name: "status",
        nullable: true,
        comment: "状态  0：停用   1：正常",
    })
    status: number | null;

    @Column("bigint", {
        name: "tenant_code",
        nullable: true,
        comment: "租户编码",
    })
    tenant_code: string | null;

}
