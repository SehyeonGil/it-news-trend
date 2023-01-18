import { Document, Types } from 'mongoose';

export interface Keyword extends Document {
  readonly title: Types.ObjectId;
  readonly word: string;
}
