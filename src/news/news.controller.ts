import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { News, NewsEdit, NewsService } from './news.service';
import { renderNewsAll } from '../views/news/news-all.js';
import { renderTemplate } from '../views/template.js';
import { CommentsService } from './comments/comments.service.js';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get('/api/detail/:id')
  get(@Param('id') id: string): News {
    const idInt = parseInt(id);
    const news = this.newsService.find(idInt);
    const comments = this.commentsService.find(idInt);

    return {
      ...news,
      comments,
    };
  }

  @Get('/api/all')
  getAll(): News[] {
    return this.newsService.getAll();
  }

  @Get('/all')
  getAllView() {
    const news = this.newsService.getAll();
    const content = renderNewsAll(news);
    return renderTemplate(content, {
      title: 'Список новостей',
      description: 'Самый крутые новости на свете!',
    });
  }

  @Put('/api/:id')
  edit(@Param('id') id: string, @Body() news: NewsEdit): News {
    const idInt = parseInt(id);
    const result = this.newsService.edit(idInt, news);
    if (result !== undefined) return result;
    else
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Новость не найдена!',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  @Post('/api')
  create(@Body() news: News): News {
    return this.newsService.create(news);
  }

  @Delete('/api/:id')
  remove(@Param('id') id: string): string {
    const idInt = parseInt(id);
    const isRemoved = this.newsService.remove(idInt);
    return isRemoved ? 'Новость удалена' : 'Передан неверный идентификатор';
  }
}
