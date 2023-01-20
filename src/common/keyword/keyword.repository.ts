import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Keyword } from './keyword.interface';
import { CreateKeywordDto } from 'src/dto';

@Injectable()
export class KeywordRepository {
    constructor(@InjectModel('Keyword') private readonly keywordModel: Model<Keyword>) {}
    
    async createKeyword(createKeywordDto: CreateKeywordDto): Promise<Keyword> {
        const createdTitle = new this.keywordModel(createKeywordDto);
        return await createdTitle.save();
    }

    async findAllKeywords(): Promise<Keyword[]> {
        return await this.keywordModel.find().exec();
    }

    async findKeywordByIdx(idx:string): Promise<Keyword> | null {
        return await this.keywordModel.findOne({idx}).exec();
    }
}