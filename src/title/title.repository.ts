import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Title } from './title.interface';
import { CreateTitleDto } from 'src/dto';

@Injectable()
export class TitleRepository {
    constructor(@InjectModel('Title') private readonly titleModel: Model<Title>) {}
    
    async createTitle(createTitleDto: CreateTitleDto): Promise<Title> {
        const createdTitle = new this.titleModel(createTitleDto);
        return await createdTitle.save();
    }

    async findAllTitles(): Promise<Title[]> {
        return await this.titleModel.find().exec();
    }

    async findTitleByIdx(idx:string): Promise<Title> | null {
        return await this.titleModel.findOne({idx}).exec();
    }
}