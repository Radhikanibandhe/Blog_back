import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { CreateCommentDTO } from './dto/comment.create.dto';
import { UserEntity } from 'src/user/user.entity';
import { BlogEntity } from './../blog/blog.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
  ) {}

  async getCommentById(id: string) {
    return this.commentRepository.getCommentById(id);
  }

  async createComment(
    createCommentDto: CreateCommentDTO,
    id: number,
    user: UserEntity,
  ) {
    return this.commentRepository.createComment(createCommentDto, user, id);
  }

  async deleteComment(id: string) {
    const comment = await this.commentRepository.delete(id);
    if (comment.affected == 0) {
      throw new NotFoundException('comment not found');
    }
    return comment;
  }

  async updateComment(id: string, createCommentDto: CreateCommentDTO) {
    const comment = await this.commentRepository.findOne(id);
    if (comment){
      comment.comment = createCommentDto.comment;
      return comment;
    }
    return null;
  }
}
