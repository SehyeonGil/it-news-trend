import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NewspaperRepository } from 'src/newspaper';
import { CrawlerService } from 'src/crawler';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);
  constructor(@Inject(NewspaperRepository) private readonly newspaperRepository: NewspaperRepository,
  @Inject(CrawlerService) private readonly crawlerService: CrawlerService) {}

  @Cron('*/10 * * * *')
  async handleCron() {
    const newspaperList = await this.newspaperRepository.findAllNewspaper();
    for(let newspaper of newspaperList) {
      this.crawlerService.crawling(newspaper);
    }
    this.logger.debug('Called Crawler');
  }
}