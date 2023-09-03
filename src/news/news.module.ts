import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article/article.entity';
import { Comment } from './comment/comment.entity';
import { CommentService } from './comment/comment.service';
@Module({
  imports: [TypeOrmModule.forFeature([Article, Comment])],
  providers: [NewsService, CommentService],
  // exports: [NewsService],
})
export class NewsModule {}
