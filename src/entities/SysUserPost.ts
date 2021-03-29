import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("idx_post_id", ["post_id"], {})
@Index("idx_user_id", ["user_id"], {})
@Entity("sys_user_post", { schema: "security_enterprise_tenant" })
export class sys_user_post {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", comment: "id" })
  id: string;

  @Column("bigint", { name: "post_id", nullable: true, comment: "岗位ID" })
  post_id: string | null;

  @Column("bigint", { name: "user_id", nullable: true, comment: "用户ID" })
  user_id: string | null;

  @Column("bigint", { name: "creator", nullable: true, comment: "创建者" })
  creator: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    comment: "创建时间",
  })
  created_at: Date | null;
}
