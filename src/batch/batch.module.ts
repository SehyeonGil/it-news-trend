import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { CrawlerModule } from '../crawler';
import { NewspaperModule } from '../newspaper';
@Module({
  imports: [CrawlerModule, NewspaperModule],
  providers: [BatchService],
  exports: [BatchService]
})
export class BatchModule {}
