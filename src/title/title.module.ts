import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TitleRepository } from './title.repository';
import { TitleSchema } from '../schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Title', schema: TitleSchema}])],
  providers: [TitleRepository],
  exports: [TitleRepository]
})
export class TitleModule {}
