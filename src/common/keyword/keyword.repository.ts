import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Keyword } from './keyword.interface';
import { CreateTitleDto } from 'src/dto';

@Injectable()
export class KeywordRepository {
    constructor(@InjectModel('Keyword') private readonly titleModel: Model<Keyword>) {}
    
    async createKeyword(createTitleDto: CreateTitleDto): Promise<Keyword> {
        const createdTitle = new this.titleModel(createTitleDto);
        return await createdTitle.save();
    }

    async findAllKeywords(): Promise<Keyword[]> {
        return await this.titleModel.find().exec();
    }

    async findKeywordByIdx(idx:string): Promise<Keyword> | null {
        return await this.titleModel.findOne({idx}).exec();
    }
}