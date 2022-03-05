import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from './blog.comment.entity';
import { CreateCommentDTO } from './dto/comment.create.dto';
import { BlogEntity } from './../blog/blog.entity';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  // create comment
  async createComment(createCommentDto: CreateCommentDTO, blog: BlogEntity) {
    const comment = new CommentEntity();
    comment.comment = createCommentDto.comment;
    comment.blog = blog;
    await comment.save();
    delete comment.blog;
    return comment;
  }
}
