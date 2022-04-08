import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsC, NewsController } from './news.controller';
import { NewsEntity } from './models/news.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity])],
  controllers: [NewsController, NewsC],
  providers: [NewsService],
})
export class NewsModule {}
