import * as mongoose from 'mongoose';
import { Newspaper } from '../common/newspaper';

export const NewspaperSchema = new mongoose.Schema<Newspaper>({
    name: {type: String, required: true},
    url: {type: String, required: true},
    newBoardSubUrl: {type: String, required: true}
});