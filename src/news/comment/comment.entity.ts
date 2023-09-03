import { Article } from '../article/article.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() // 댓글 내용
  content: string;

  @Column() // 공감수
  sympathyCount: number;

  @Column() // 비공감수
  antipathyCount: number;

  @Column({ nullable: false }) // 외래키
  article_id: number;

  @ManyToOne(() => Article, (article) => article.contents)
  @JoinColumn({ name: 'article_id' })
  article: Article;
}
