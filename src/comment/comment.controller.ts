import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import { CreateCommentDTO } from './dto/comment.create.dto';
import { CommentEntity } from './blog.comment.entity';
import { GetComment } from './get.comment.decorator';
import { BlogEntity } from './../blog/blog.entity';
import { GetBlog } from 'src/blog/get.blog.decorator';

@Controller('comment')
@UseGuards(AuthGuard())
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  @UsePipes()
  createComment(
    @GetBlog() blog: BlogEntity,
    @Body() createCommentDto: CreateCommentDTO,
  ) {
    return this.commentService.createComment(createCommentDto, blog);
  }

  @UseGuards(AuthGuard())
  @Get('/:id')
  getComment(@Param('id') id: string) {
    return this.commentService.getCommentById(id);
  }

  @Delete('/:id')
  deleteComment(@Param('id') id: string) {
    return this.commentService.deleteComment(id);
  }

  @Patch(':id')
  updateComment(
    @Param(':id') id: string,
    @Body() createCommentDto: CreateCommentDTO,
  ) {
    return this.commentService.updateComment(id, createCommentDto);
  }
}
