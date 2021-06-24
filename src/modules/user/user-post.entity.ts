import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "../post/post.entity";
import { BaseEntity } from "../_base/base.entity";
import { UserEntity } from "./user.entity";

@Index("idx_post_id", ["post_id"], {})
@Index("idx_user_id", ["user_id"], {})
  @Entity("sys_user_post", { schema: "race_nestjs_admin" })
export class UserPostEntity extends BaseEntity{

  @Column("bigint", { name: "post_id", nullable: true, comment: "岗位ID" })
  post_id: string | null;

  @Column("bigint", { name: "user_id", nullable: true, comment: "用户ID" })
  user_id: number | null;


  @ManyToOne(
    type => UserEntity,
    user => user.userPosts,
  )
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity

  @ManyToOne(
    type => PostEntity,
    post => post.userPosts,
  )
  @JoinColumn({ name: 'post_id' })
  post!: PostEntity
}
