import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CreateCommentDTO } from './dto/comment.create.dto';
import { BlogEntity } from './../blog/blog.entity';
import { UserEntity } from 'src/user/user.entity';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  // create comment
  async createComment(
    createCommentDto: CreateCommentDTO,
    user: UserEntity,
    id: number,
  ) {
    const comment = new CommentEntity();
    comment.comment = createCommentDto.comment;
    comment.username = user.username;
    comment.blogId = id;

    await comment.save();
    return comment;
  }

  async getCommentById(id: string) {
    const query = this.createQueryBuilder('comment');
    query.andWhere('comment.blogId=:id', { id: id });

    const comment = query.getMany();
    if (comment) {
      return comment;
    }
  }
}
