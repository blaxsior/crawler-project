import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Keyword } from './keyword.entity';
import { Admin } from 'src/admin/admin.entity';

/**
 * 키워드를 관리 + 기록 목적의 엔티티
 */
@Entity()
export class KeywordAction {
  @PrimaryGeneratedColumn()
  id: string;

  /**
   * 어떤 액션인지 정보
   * ex) CREATE, DELETE
   */
  @Column()
  action: string;

  /**
   * 현재 액션을 수행하는 이유
   */
  @Column()
  describe: string;

  @CreateDateColumn()
  createdAt: string;

  @Column()
  keyword_id: number;

  @ManyToOne(() => Keyword, (keyword) => keyword.id)
  @JoinColumn({ name: 'keyword_id' })
  keyword: Keyword;

  @Column()
  admin_id: number;

  @ManyToOne(() => Admin, (admin) => admin.id)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;
}
