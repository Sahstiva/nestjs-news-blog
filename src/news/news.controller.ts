import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put, HttpException, HttpStatus,
} from '@nestjs/common';
import { News, NewsEdit, NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/detail/:id')
  get(@Param('id') id: string): News {
    const idInt = parseInt(id);
    return this.newsService.find(idInt);
  }

  @Get('/all')
  getAll(): News[] {
    return this.newsService.getAll();
  }

  @Put('/:id')
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

  @Post()
  create(@Body() news: News): News {
    return this.newsService.create(news);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): string {
    const idInt = parseInt(id);
    const isRemoved = this.newsService.remove(idInt);
    return isRemoved ? 'Новость удалена' : 'Передан неверный идентификатор';
  }
}
