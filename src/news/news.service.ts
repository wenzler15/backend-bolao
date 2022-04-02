/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from './models/news.entity';
import { News } from './models/news.interface';
import { Cron } from '@nestjs/schedule';
const { parse } = require('rss-to-json');

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {}

  @Cron('0 1 * * * *')
  async handleCron() {
    let rss = await parse("https://www.gazetaesportiva.com/times/feed/");
  
    rss.items.forEach( async (item) => {
      const exists = await this.newsRepository.findOne({ where: { title: item.title}});

      if(exists) return;

      const data = {
        title: item.title,
        url: item.link
      };

      await this.newsRepository.save(data);
    });
    console.log("salvo");
  }

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

  async findOne(id: string) {
    let rss = await parse(`https://www.gazetaesportiva.com/times/${id}/feed/`);
  
    let data = [];

    rss.items.forEach( async (item) => {
      const toData = {        
        title: item.title,
        link: item.link
      }
      data.push(toData)
    });

    return data;
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
