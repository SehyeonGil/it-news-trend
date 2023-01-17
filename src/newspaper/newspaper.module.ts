import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewspaperRepository } from '../newspaper/newspaper.repository';
import { NewspaperSchema } from '../schema';
import { NewspaperServiceFactory } from './newspaper.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Newspaper', schema: NewspaperSchema}])],
  providers: [NewspaperRepository, NewspaperServiceFactory],
  exports: [NewspaperRepository, NewspaperServiceFactory]
})
export class NewspaperModule {}
