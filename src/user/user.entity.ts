import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BlogEntity } from './../blog/blog.entity';
import * as crypto from 'crypto-js';
import { Gender } from './gender.enum';
import { CommentEntity } from '../comment/blog.comment.entity';

@Entity('User')
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  email: string;

  @Column()
  gender: Gender;

  @OneToMany((type) => BlogEntity, (blog) => blog.user, { eager: true })
  blogs: BlogEntity[];

  validatePassword(password: string) {
    const encrypted = `${crypto.MD5(password)}`;
    return encrypted == this.password;
  }
}
