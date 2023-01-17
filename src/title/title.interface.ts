import { Document, Types } from 'mongoose';

export interface Title extends Document {
  readonly newspaper: Types.ObjectId;
  readonly idx: string;
  readonly text: string;
  readonly url: string;
  readonly regDate: string;
}
