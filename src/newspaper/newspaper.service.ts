import { Injectable } from '@nestjs/common';
import { Newspaper, NewspaperService } from './newspaper.interface';
import { CreateNewBoardPageUrlDto } from 'src/dto';

@Injectable()
export class NewspaperServiceFactory {
    create(newspaper: Newspaper) {
        switch(newspaper.name){
            case "techsuda": 
                return new RestfulNewspaperService();
            default:
                return new QueryNewspaperService();
        }
    }
}

class QueryNewspaperService implements NewspaperService {
    createNewsPageUrl(createNewBoardPageUrlDto: CreateNewBoardPageUrlDto): string {
        return createNewBoardPageUrlDto.newspaper.url + createNewBoardPageUrlDto.newspaper.newBoardSubUrl + (createNewBoardPageUrlDto.newspaper.newBoardSubUrl.includes("?") ? "&" : "?") + "page=" + createNewBoardPageUrlDto.page;
    }
}

class RestfulNewspaperService implements NewspaperService {
    createNewsPageUrl(createNewBoardPageUrlDto: CreateNewBoardPageUrlDto): string {
        return createNewBoardPageUrlDto.newspaper.url + createNewBoardPageUrlDto.newspaper.newBoardSubUrl + "/" + createNewBoardPageUrlDto.page;
    }
}