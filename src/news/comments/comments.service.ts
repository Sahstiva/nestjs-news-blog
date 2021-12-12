import { Injectable } from '@nestjs/common';
import { getRandomInt, News, NewsEdit } from '../news.service';

export type Comment = {
  id?: number;
  message: string;
  author: string;
  reply?: number;
};

export type CommentEdit = {
  id: number;
  message?: string;
  author?: string;
};

@Injectable()
export class CommentsService {
  private readonly comments = {};

  create(idNews: number, comment: Comment, idParent = 0): string | undefined {
    if (!this.comments[idNews]) {
      this.comments[idNews] = [];
    }
    if (idParent)
      this.comments[idNews].push({
        ...comment,
        id: getRandomInt(),
        reply: idParent,
      });
    else this.comments[idNews].push({ ...comment, id: getRandomInt() });
    return 'Комментарий был создан';
  }

  edit(
    idNews: number,
    idComment: number,
    comment: CommentEdit,
  ): Comment | undefined {
    const indexEditComment = this.comments[idNews].findIndex(
      (comment) => comment.id === idComment,
    );
    if (indexEditComment !== -1) {
      this.comments[idNews][indexEditComment] = {
        ...this.comments[idNews][indexEditComment],
        ...comment,
      };
      return this.comments[idNews][indexEditComment];
    }
    return undefined;
  }

  find(idNews: number): Comment[] | null {
    return this.comments[idNews] || null;
  }

  remove(idNews: number, idComment: number): Comment[] | null {
    if (!this.comments[idNews]) {
      return null;
    }

    const indexComment = this.comments[idNews].findIndex(
      (comment) => comment.id === idComment,
    );
    if (indexComment === -1) {
      return null;
    }
    return this.comments[idNews].splice(indexComment, 1);
  }
}
