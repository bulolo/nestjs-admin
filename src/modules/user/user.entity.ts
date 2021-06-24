import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DeptEntity } from "../dept/dept.entity";
import { UserRoleEntity } from "./user-role.entity";
import { BaseEntity } from "../_base/base.entity";
import { BaseTenantEntity } from "../_base/baseTenant.entity";
import { UserPostEntity } from "./user-post.entity";

@Index("uk_username", ["username"], { unique: true })
@Index("idx_create_date", ["created_at"], {})
@Entity("sys_user", { schema: "race_nestjs_admin" })
export class UserEntity extends BaseTenantEntity {

  @ApiProperty({ type: String, description: '用户名' })
  @Column("varchar", {
    name: "username",
    unique: true,
    comment: "用户名",
    length: 50,
  })
  username: string;

  @ApiProperty({ type: String, description: '密码' })
  @Column("varchar", {
    name: "password",
    nullable: true,
    comment: "密码",
    length: 100,
    // select: false
  })
  @Exclude({ toPlainOnly: true })
  password: string | null;

  @ApiProperty({ type: String, description: '姓名' })
  @Column("varchar", {
    name: "real_name",
    nullable: true,
    comment: "姓名",
    length: 50,
  })
  real_name: string | null;

  @ApiProperty({ type: String, description: '头像' })
  @Column("varchar", {
    name: "head_url",
    nullable: true,
    comment: "头像",
    length: 200,
  })
  head_url: string | null;

  @ApiProperty({ type: Number, description: '性别' })
  @Column("tinyint", {
    name: "gender",
    nullable: true,
    comment: "性别   0：男   1：女    2：保密",
    unsigned: true,
  })
  gender: number | null;

  @ApiProperty({ type: String, description: '邮箱' })
  @Column("varchar", {
    name: "email",
    nullable: true,
    comment: "邮箱",
    length: 100,
  })
  email: string | null;

  @ApiProperty({ type: String, description: '手机号' })
  @Column("varchar", {
    name: "mobile",
    nullable: true,
    comment: "手机号",
    length: 100,
  })
  mobile: string | null;

  @ApiProperty({ type: Number, description: '部门ID' })
  @Column("bigint", { name: "dept_id", nullable: true, comment: "部门ID" })
  dept_id: number | null;

  @ApiProperty({ type: Number, description: '超级管理员' })
  @Column("tinyint", {
    name: "super_admin",
    nullable: true,
    comment: "超级管理员   0：否   1：是",
    unsigned: true,
  })
  super_admin: number | null;

  @ApiProperty({ type: Number, description: '租户管理员' })
  @Column("tinyint", {
    name: "super_tenant",
    nullable: true,
    comment: "租户管理员   0：否   1：是",
    unsigned: true,
  })
  super_tenant: number | null;

  @ApiProperty({ type: Number, description: '状态' })
  @Column("tinyint", {
    name: "status",
    nullable: true,
    comment: "状态  0：停用   1：正常",
  })
  status: number | null;

  @ApiProperty({ type: String, description: '密码加盐' })
  @Column("varchar", {
    name: "salt",
    nullable: true,
    comment: "密码加盐",
    length: 100,
  })
  @Exclude({ toPlainOnly: true })
  salt: string | null;

  @OneToOne((type) => DeptEntity)
  @JoinColumn({ name: 'dept_id' })
  dept: DeptEntity;

  // 角色关系
  @OneToMany((type) => UserRoleEntity, (userRoles) => userRoles.user, { cascade: ['insert', 'remove'], nullable: false })
  public userRoles!: UserRoleEntity[]

  // 岗位关系
  @OneToMany((type) => UserPostEntity, (userPosts) => userPosts.user, { cascade: ['insert', 'remove'], nullable: false })
  public userPosts!: UserPostEntity[]
}
