import { Types } from 'mongoose';

export interface CreateTitleDto {
    newspaper: Types.ObjectId,
    idx: string,
    text: string,
    regDate: string
}