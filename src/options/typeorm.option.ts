import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Database } from 'better-sqlite3';
export const devOptions: TypeOrmModuleOptions = {
  type: 'better-sqlite3',
  database: 'dev.db',
  prepareDatabase: (db: Database) => {
    db.pragma('journal_mode = WAL');
  },
  synchronize: true,
  entities: ['dist/**/*.entity.js'], // 실행되는 시점에는 js로 컴파일됨
};
