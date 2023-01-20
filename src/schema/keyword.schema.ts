import * as mongoose from 'mongoose';
import { Keyword } from '../common/keyword';

export const KeywordSchema = new mongoose.Schema<Keyword>({
    word: {type: String, required: true},
    score: {type: Number, required: true},
    regDate: {type: Date, required: true},
});