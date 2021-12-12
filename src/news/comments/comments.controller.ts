import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CommentsService, Comment, CommentEdit } from './comments.service';
import { News, NewsEdit } from '../news.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/api/:idNews')
  create(@Param('idNews') idNews: string, @Body() comment: Comment) {
    const idNewsInt = parseInt(idNews);
    return this.commentsService.create(idNewsInt, comment);
  }

  @Post('/api/:idNews/:idParent')
  createReply(
    @Param('idNews') idNews: string,
    @Param('idParent') idParent: string,
    @Body() comment: Comment,
  ) {
    const idNewsInt = parseInt(idNews);
    const idParentInt = parseInt(idParent);
    return this.commentsService.create(idNewsInt, comment, idParentInt);
  }

  @Put('/api/details/:idNews/:idComment')
  edit(
    @Param('idNews') idNews: string,
    @Param('idComment') idComment: string,
    @Body() comment: CommentEdit,
  ): Comment {
    const idNewsInt = parseInt(idNews);
    const idCommentInt = parseInt(idComment);
    const result = this.commentsService.edit(idNewsInt, idCommentInt, comment);
    if (result !== undefined) return result;
    else
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Комментарий не найден!',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  @Get('/api/details/:idNews')
  get(@Param('idNews') idNews: string) {
    const idNewsInt = parseInt(idNews);
    return this.commentsService.find(idNewsInt);
  }

  @Delete('/api/details/:idNews/:idComment')
  remove(
    @Param('idNews') idNews: string,
    @Param('idComment') idComment: string,
  ) {
    const idNewsInt = parseInt(idNews);
    const idCommentInt = parseInt(idComment);
    return this.commentsService.remove(idNewsInt, idCommentInt);
  }
}
