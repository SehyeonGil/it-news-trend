import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NewspaperRepository } from 'src/common/newspaper';
import { CrawlerService } from 'src/common/crawler';
import { KeywordService } from 'src/common/keyword';
import { TitleRepository } from 'src/common/title';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);
  constructor(@Inject(NewspaperRepository) private readonly newspaperRepository: NewspaperRepository,
  @Inject(CrawlerService) private readonly crawlerService: CrawlerService,
  @Inject(KeywordService) private readonly keywordService: KeywordService,
  @Inject(TitleRepository) private readonly titleRepository: TitleRepository) {}

  //@Cron('*/10 * * * *')
  async handleCron() {
    const newspaperList = await this.newspaperRepository.findAllNewspaper();
    for(let newspaper of newspaperList) {
      this.crawlerService.crawling(newspaper);
    }
    this.logger.debug('Called Crawler');
  }

  @Cron('0 50 * * * *')
  async handleCronKeyword() {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    const titleList = await this.titleRepository.findTitleByRegDate(date);
    const keywordList = await this.keywordService.extractKeywordFromTitle(titleList);
    
    const json = JSON.parse(keywordList.replace(/'/g, "\""));
    const keywords = [];
    for(const key in json){
      keywords.push(key);
    }
    console.log(keywords);

    this.logger.debug('Called Crawler');
  }
}