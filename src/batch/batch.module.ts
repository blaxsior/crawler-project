import { Logger, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchService } from './batch.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [BatchService, Logger],
})
export class BatchModule {}
