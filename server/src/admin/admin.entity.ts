import { KeywordAction } from 'src/keyword/keyword-action.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
} from 'typeorm';

// 로그인은 클라이언트에서 사용될 것 같음.
@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  level: string;

  @Column()
  activated: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => KeywordAction, (action) => action.admin)
  actions: KeywordAction[];
}
