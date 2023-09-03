import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
// https://docs.nestjs.com/techniques/database#custom-datasource-factory
export const devMysqlOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: 'localhost',
    username: configService.get<string>('MYSQL_USER'),
    password: configService.get<string>('MYSQL_PASSWORD'),
    database: configService.get<string>('MYSQL_DATABASE'),
    entities: ['dist/**/*.entity.js'], // 실행되는 시점에는 js로 컴파일됨,
    logger: 'simple-console',
  }),
};
