import { Module } from '@nestjs/common';
import { CrawlerController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
import { TitleModule } from 'src/title';
import { ParserModule } from 'src/parser';
import { NewspaperModule } from 'src/newspaper';

@Module({
  imports: [TitleModule, ParserModule, NewspaperModule],
  controllers: [CrawlerController],
  providers: [CrawlerService],
  exports: [CrawlerService]
})
export class CrawlerModule {}
