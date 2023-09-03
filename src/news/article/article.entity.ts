import { Comment } from '../comment/comment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Keyword } from 'src/keyword/keyword.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() // 제목
  title: string;

  @Column('date') // 작성일
  publishedAt: Date;

  @Column() // 기자
  author: string;

  @Column() // url
  url: string;

  @Column() // 본문
  body: string;

  // @ManyToOne()
  // keyword: string;

  @OneToMany(() => Comment, (comment) => comment.article, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  contents: Comment[]; // 댓글 목록

  @Column()
  keyword_id: number;

  @ManyToOne(() => Keyword, (keyword) => keyword.articles)
  @JoinColumn({ name: 'keyword_id' })
  keyword: Keyword;
}
