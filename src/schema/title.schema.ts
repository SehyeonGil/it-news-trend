import * as mongoose from 'mongoose';
import { Title } from '../title';

export const TitleSchema = new mongoose.Schema<Title>({
    newspaper: {type: mongoose.Schema.Types.ObjectId, required: true},
    idx: {type: String, required: true},
    text: {type: String, required: true},
    url: {type: String, required: true},
    regDate: Date
});