import { News } from '../../news/news.service';
import { Comment } from '../../news/comments/comments.service';

export function renderDetailNews(news: News, comments: Comment[]): string {
  let commentsListHtml = '';
  for (const commentItem of comments) {
    if (!commentItem.reply) {
      const replies = comments.filter(
        (comment) => comment.reply === commentItem.id,
      );
      commentsListHtml += renderCommentBlock(commentItem, replies);
    }
  }

  const detailNewsHtml = renderNewsBlockWithComments(news, commentsListHtml);

  return `
    <h1>О новости подробно!</h1>
    
    <div class="row">
      ${detailNewsHtml}
    </div>
`;
}

function renderCommentBlock(comment: Comment, replies: Comment[] = []): string {
  let commentBlockHtml = `<li>${comment.author}:  ${comment.message}`;
  if (replies.length > 0) {
    commentBlockHtml += '<ul>';
    for (const replyItem of replies)
      commentBlockHtml += `<li>${replyItem.author}: ${replyItem.message}</li>`;
    commentBlockHtml += '</ul>';
  }
  commentBlockHtml += '</li>';
  return commentBlockHtml;
}

function renderNewsBlockWithComments(
  news: News,
  commentsListHtml: string,
): string {
  return `
  <div class="col-lg-4 mb-2">
    <div class="card" style="width: 100%;">
      ${
        news.cover
          ? `<img src="${news.cover}" style="height: 200px; object-fit: cover;" class="card-img-top" alt="...">`
          : ''
      }
      <div class="card-body">
        <h5 class="card-title">${news.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${news.author}</h6>
        <p class="card-text">${news.description}</p>
        <ul>${commentsListHtml}</ul>
      </div>
    </div>
  </div>
  `;
}
