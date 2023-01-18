import { Module } from '@nestjs/common';
import { CrawlerController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
import { TitleModule } from 'src/common/title';
import { ParserModule } from 'src/common/parser';
import { NewspaperModule } from 'src/common/newspaper';

@Module({
  imports: [TitleModule, ParserModule, NewspaperModule],
  controllers: [CrawlerController],
  providers: [CrawlerService],
  exports: [CrawlerService]
})
export class CrawlerModule {}
