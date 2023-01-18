import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { dateObjConvertToYearMonthDate } from '../../util/datetime';
import { ParserService } from "./parser.interface";
import { Newspaper } from "../newspaper";
import { ParsedDto } from '../../dto/parsed.dto';

@Injectable()
export class ParserServiceFactory {
    create(newspaper: Newspaper): ParserService | Error{
        switch(newspaper.name){
            case "bloter": 
                return new BloterParserService();
            case "ciokorea": 
                return new CiokoreaParserService();
            case "itworld": 
                return new ItworldParserService();
            case "zdnet": 
                return new ZdnetParserService();
            case "techsuda": 
                return new TechsudaParserService();
            default:
                return new Error('unsupported Newspaper');
        }
    }
}

const createRegDate = (regDateRaw: string) => {
    const a = (regDateRaw: string): string => {
        const newDate = new Date();
        const num = parseInt(regDateRaw.slice(0, regDateRaw.length - 3));
        newDate.setDate(newDate.getDate() - num);
        return dateObjConvertToYearMonthDate(newDate);
    }
    return /\d{4}-\d{2}-\d{2}/.test(regDateRaw) ? dateObjConvertToYearMonthDate(new Date(regDateRaw)) : /\d{1}일 전/.test(regDateRaw) ? a(regDateRaw) : dateObjConvertToYearMonthDate(new Date());
}

export class BloterParserService implements ParserService {
    constructor() {}
    
    parse(page: string): Array<ParsedDto> {
        const $ = cheerio.load(page);
        const arr:Array<ParsedDto> = [];
        $('li', '.newslist_left').map((i, el) => {
            const url = $(el).children('a').attr('href');
            const title = $(el).children('a').children('h4').text();
            const regDateRaw = $(el).children('div').children('span.date').text().replace(/\t/g, "");
            const regDate = createRegDate(regDateRaw);
            arr.push({
                idx: url.slice(url.lastIndexOf("/") + 1),
                text: title,
                url,
                regDate
            }) 
        });

        return arr;
    }
}

export class CiokoreaParserService implements ParserService {
    constructor() {}
    

    parse(page: string): Array<ParsedDto> {
        const $ = cheerio.load(page);
        const arr:Array<ParsedDto> = [];
        $('div.card-body', '.card.card-article > .d-lg-flex').map((i, el) => {
            const url = $(el).children('h4').children('a').attr('href');
            const title = $(el).children('h4').children('a').children('span').text();
            const regDateRaw = $(el).children('p').children('small').text().replace(/\t/g, "");
            const regDate = createRegDate(regDateRaw);
            arr.push({
                idx: url.slice(url.lastIndexOf("/") + 1),
                text: title,
                url,
                regDate
            }) 
        });

        return arr;
    }
}

export class ItworldParserService implements ParserService {
    constructor() {}
    
    parse(page: string): Array<ParsedDto> {
        const $ = cheerio.load(page);
        const arr:Array<ParsedDto> = [];
        $('div.card-body', '.node-list > .card > .row > .col').map((i, el) => {
            const url = $(el).children('h5').children('a').attr('href');
            const title = $(el).children('h5').children('a').text();
            const regDateRaw = $(el).children('p').children('small').text().replace(/\t/g, "");
            const regDate = createRegDate(regDateRaw);
            arr.push({
                idx: url.slice(url.lastIndexOf("/") + 1),
                text: title,
                url,
                regDate
            }) 
        });

        return arr;
    }
}

export class ZdnetParserService implements ParserService {
    constructor() {}
    
    parse(page: string): Array<ParsedDto> {
        const $ = cheerio.load(page);
        const arr:Array<ParsedDto> = [];
        $('div.assetText', '.news_box > .newsPost').map((i, el) => {
            const url = $(el).children('a').attr('href');
            const title = $(el).children('a').children('h3').text();
            const regDateRaw = $(el).children('p').children('span').text().replace(/\t/g, "").replace(/./g, "-").slice(0, 10);
            const regDate = createRegDate(regDateRaw);
            arr.push({
                idx: url.slice(url.lastIndexOf("/") + 1).replace("?no=", ""),
                text: title,
                url,
                regDate
            }) 
        });

        return arr;
    }
}

export class TechsudaParserService implements ParserService {
    constructor() {}
    
    parse(page: string): Array<ParsedDto> {
        const $ = cheerio.load(page);
        const arr:Array<ParsedDto> = [];
        $('article.item-list', '.cat-box-content').map((i, el) => {
            const url = $(el).children('h2').children('a').attr('href');
            const title = $(el).children('h2').children('a').text();
            const regDateRaw = $(el).children('p').children('span.tie-date').text().replace(/\t| /g, "").replace(/년|월|일/g, "-").slice(0, 10);
            const regDate = createRegDate(regDateRaw);
            arr.push({
                idx: url.slice(url.lastIndexOf("/") + 1),
                text: title,
                url,
                regDate
            }) 
        });

        return arr;
    }
}