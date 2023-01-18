import { CreateNewBoardPageUrlDto } from "src/dto";
import { Types } from 'mongoose';

export interface Newspaper extends Document {
    _id: Types.ObjectId;
    readonly name: string;
    readonly url: string;
    readonly newBoardSubUrl: string;
}

export interface NewspaperService {
    createNewsPageUrl(createNewsPageUrlDto: CreateNewBoardPageUrlDto): string
}