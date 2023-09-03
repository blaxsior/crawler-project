import { Article } from 'src/news/article/article.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  DeleteDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { KeywordAction } from './keyword-action.entity';

// 로그인은 클라이언트에서 사용될 것 같음.
@Entity()
export class Keyword {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Index({ unique: true }) // 키워드는 하나만 존재 가능
  name: string;

  @Column()
  state: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn() //soft delete 활용 예정
  deletedAt: Date;

  @OneToMany(() => Article, (article) => article.keyword)
  articles: Article[];

  @OneToMany(() => KeywordAction, (action) => action.keyword)
  actions: KeywordAction[];
}
