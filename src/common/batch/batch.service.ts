import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NewspaperRepository } from 'src/common/newspaper';
import { CrawlerService } from 'src/common/crawler';
import { KeywordRepository, KeywordService } from 'src/common/keyword';
import { TitleRepository } from 'src/common/title';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);
  constructor(@Inject(NewspaperRepository) private readonly newspaperRepository: NewspaperRepository,
    @Inject(CrawlerService) private readonly crawlerService: CrawlerService,
    @Inject(KeywordService) private readonly keywordService: KeywordService,
    @Inject(KeywordRepository) private readonly keywordRepository: KeywordRepository,
    @Inject(TitleRepository) private readonly titleRepository: TitleRepository) { }

  @Cron('* */6 * * *')
  async handleCron() {
    const newspaperList = await this.newspaperRepository.findAllNewspaper();
    for (let newspaper of newspaperList) {
      this.crawlerService.crawling(newspaper);
    }
    this.logger.debug('Called Crawler');
  }

  @Cron('0 0 * * *')
  async handleCronKeyword() {
    const date = new Date();
    const regDate = new Date();
    date.setDate(date.getDate() - 7);
    regDate.setHours(0, 0, 0, 0);
    const titleList = await this.titleRepository.findTitleByRegDate(date);
    const keywordList = await this.keywordService.extractKeywordFromTitle(titleList);

    const json = JSON.parse(keywordList.replace(/'/g, "\""));
    const keywords = [];
    for (const key in json) {
      this.keywordRepository.createKeyword({ word: key, score: json[key], regDate })
      keywords.push(key);
    }
    this.logger.debug(keywords);

    this.logger.debug('Called Crawler');
  }
}