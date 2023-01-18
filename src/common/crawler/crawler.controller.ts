import { Controller, Get } from '@nestjs/common';
import { CrawlerService } from './crawler.service';

@Controller('')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

/*   @Get()
  getHello(): object {
    return this.crawlerService.crawling("https://www.fmkorea.com/index.php?mid=best&page=1");
  } */

  @Get("test")
  getTest(): object {
    return this.crawlerService.test();
  }

  @Get("test2")
  getTest2(): object {
    return this.crawlerService.test2();
  }
}
