import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uk_user_id", ["user_id"], { unique: true })
@Index("uk_token", ["token"], { unique: true })
@Entity("sys_user_token", { schema: "security_enterprise_tenant" })
export class sys_user_token {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("bigint", { name: "user_id", unique: true, comment: "用户id" })
  user_id: string;

  @Column("varchar", {
    name: "token",
    unique: true,
    comment: "用户token",
    length: 100,
  })
  token: string;

  @Column("datetime", {
    name: "expire_date",
    nullable: true,
    comment: "过期时间",
  })
  expire_date: Date | null;

  @Column("datetime", {
    name: "updated_at",
    nullable: true,
    comment: "更新时间",
  })
  updated_at: Date | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    comment: "创建时间",
  })
  created_at: Date | null;
}
