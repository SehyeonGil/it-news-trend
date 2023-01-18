import { Module } from '@nestjs/common';
import { ParserServiceFactory } from './parser.service';

@Module({
  providers: [ParserServiceFactory],
  exports: [ParserServiceFactory]
})
export class ParserModule {}
