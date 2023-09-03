import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BatchModule } from './batch/batch.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { devMysqlOptions } from './options/typeorm.option';
import { ConfigModule } from '@nestjs/config';
import { validateOptions } from './util/validate-config';
console.log(devMysqlOptions);
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateOptions,
      isGlobal: true,
    }),
    BatchModule,
    AdminModule,
    TypeOrmModule.forRootAsync(devMysqlOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
