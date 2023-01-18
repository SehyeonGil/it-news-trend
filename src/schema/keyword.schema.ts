import * as mongoose from 'mongoose';
import { Keyword } from '../common/keyword';

export const KeywordSchema = new mongoose.Schema<Keyword>({
    title: {type: mongoose.Schema.Types.ObjectId, required: true},
    word: {type: String, required: true},
});