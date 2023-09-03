import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class BatchService {
  constructor(private logger: Logger) {}
  @Cron('0/10 * * * * *')
  batch() {
    this.logger.log('hello');
  }
}
