import { Injectable } from '@nestjs/common';
import { ArticleService } from './article/article.service';
import { CommentService } from './comment/comment.service';

@Injectable()
export class NewsService {
  constructor(
    private articleService: ArticleService,
    private commentService: CommentService,
  ) {}
}
