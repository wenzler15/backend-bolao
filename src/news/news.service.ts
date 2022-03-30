/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from './models/news.entity';
import { News } from './models/news.interface';
@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {}

  async create(news: News) {
    const title = news.title;

    const newsExists = await this.newsRepository.findOne({ where: { title } });

    if (newsExists) return { message: 'News already exists' };

    const response = await this.newsRepository.save(news);

    return { message: 'News created', news: response };
  }

  findAll() {
    return this.newsRepository.find({
      order: {
        title: 'ASC',
      },
    });
  }

  findOne(id: string) {
    return this.newsRepository.findByIds([id]);
  }

  async update(id: string, updateNewsDto: News) {
    const data = await this.newsRepository.findOne({ where: { id } });

    if (!data) return { message: 'News not found' };

    const response = await this.newsRepository.save({
      ...data,
      ...updateNewsDto,
    });

    return { message: 'News updated', news: response };
  }

  remove(id: string) {
    return { message: 'News deleted', data: this.newsRepository.delete(id) };
  }
}
