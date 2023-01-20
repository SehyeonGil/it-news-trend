import { Document } from 'mongoose';

export interface Keyword extends Document {
  readonly word: string;
  readonly score: number;
  readonly regDate: Date
}