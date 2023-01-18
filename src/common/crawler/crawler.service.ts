import { Inject, Injectable } from '@nestjs/common';
import got from 'got';
import { Title } from '../title/title.interface';
import { TitleRepository } from 'src/common/title';
import { ParserServiceFactory } from '../parser';
import { Newspaper, NewspaperServiceFactory } from '../newspaper';

@Injectable()
export class CrawlerService {
    constructor(@Inject(TitleRepository) private readonly titleRepository: TitleRepository,
        @Inject(ParserServiceFactory) private readonly parserServiceFactory: ParserServiceFactory,
        @Inject(NewspaperServiceFactory) private readonly NewspaperServiceFactory: NewspaperServiceFactory) { }

    private async getPage(url: string): Promise<string> {
        //TODO: 에러핸들링
        try{
            const result = await got.get(url);
            return result.body;
        }catch(err){
            throw new Error("undefined Error");
        }
    }

    async crawling(newspaper: Newspaper): Promise<void> {
        let endFlag = false;
        let page = 1;
        while (!endFlag && page < 10) {
            const url = this.NewspaperServiceFactory.create(newspaper).createNewsPageUrl({ newspaper, page })
            let result: string;
            try{
                result = await this.getPage(url);
            }catch(err){
                console.log('error: ' + newspaper.name + " can't read");
                break;
            }
            const parserService = this.parserServiceFactory.create(newspaper);
            if (parserService instanceof Error) {
                //TODO 로그 처리 및 에러핸들링 필요
                break;
            }
            const parsedPage = parserService.parse(result);

            for (const parsedDto of parsedPage) {
                if (await this.titleRepository.findTitleByIdx(parsedDto.idx) !== null) {
                    endFlag = true;
                    continue;
                }
                const title = {
                    newspaper: newspaper._id,
                    ...parsedDto
                }
                await this.titleRepository.createTitle(title);
            }
            page++;
            console.log("newspaper:" + newspaper.name + " time: " + new Date() + " page: " + page);
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    async test(): Promise<Title> {
        const result = await this.titleRepository.findTitleByIdx("1");
        console.log(result);
        return result;
    }

    async test2(): Promise<Title[]> {
        return await this.titleRepository.findAllTitles();
    }
}