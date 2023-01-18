import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { CrawlerModule } from '../crawler';
import { NewspaperModule } from '../newspaper';
import { KeywordModule } from '../keyword';
import { TitleModule } from '../title';
@Module({
  imports: [CrawlerModule, NewspaperModule, KeywordModule, TitleModule],
  providers: [BatchService],
  exports: [BatchService]
})
export class BatchModule {}
