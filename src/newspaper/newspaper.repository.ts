import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Newspaper } from './newspaper.interface';

@Injectable()
export class NewspaperRepository {
    constructor(@InjectModel('Newspaper') private readonly newspaperModel: Model<Newspaper>) {}
    
    async findAllNewspaper(): Promise<Newspaper[]> {
        return await this.newspaperModel.find().exec();
    }

    async findNewspaper(newspaper:Newspaper): Promise<Newspaper> | null {
        return await this.newspaperModel.findOne(newspaper).exec();
    }
}