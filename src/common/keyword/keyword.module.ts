import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KeywordRepository } from './keyword.repository';
import { KeywordService } from './keyword.service';
import { KeywordController } from './keyword.controller';
import { KeywordSchema } from '../../schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Keyword', schema: KeywordSchema}])],
  controllers: [KeywordController],
  providers: [KeywordRepository, KeywordService],
  exports: [KeywordRepository, KeywordService]
})
export class KeywordModule {}
