import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { CrawlerModule } from '../common/crawler';
import { BatchModule } from 'src/common/batch';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/it-news-trend'), ScheduleModule.forRoot(), CrawlerModule, BatchModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
