import { UserEntity } from 'src/user/user.entity';
import { IsNotEmpty } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlogEntity } from 'src/blog/blog.entity';

@Entity('comment')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  comment: string;

  @ManyToOne((type) => BlogEntity, (blog) => blog.comments, { eager: true })
  blog: BlogEntity;

  
}
