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
import { CommentEntity } from './comment.entity';
import { GetComment } from './get.comment.decorator';
import { BlogEntity } from './../blog/blog.entity';
import { GetBlog } from 'src/blog/get.blog.decorator';
import { GetUser } from 'src/user/get.user.decorator';
import { UserEntity } from 'src/user/user.entity';

@Controller('comment')
@UseGuards(AuthGuard())
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('/:id')
  @UsePipes()
  createComment(
    @Param('id') id: number,
    @Body() createCommentDto: CreateCommentDTO,
    @GetUser() user: UserEntity,
  ) {
    return this.commentService.createComment(createCommentDto, id, user);
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
