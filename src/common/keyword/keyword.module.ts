import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KeywordRepository } from './keyword.repository';
import { KeywordService } from './keyword.service';
import { KeywordSchema } from '../../schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Keyword', schema: KeywordSchema}])],
  providers: [KeywordRepository, KeywordService],
  exports: [KeywordRepository, KeywordService]
})
export class KeywordModule {}
