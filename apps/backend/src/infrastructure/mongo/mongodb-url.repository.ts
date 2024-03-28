import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UrlEntity, UrlRepositoryPort } from '@url-shortener/shared';
import { Model } from 'mongoose';

@Injectable()
export class MongoDbUrlRepository implements UrlRepositoryPort {
  constructor(
    @InjectModel('UrlEntity') private readonly urlModel: Model<UrlEntity>
  ) {}

  async save(url: UrlEntity): Promise<void> {
    await this.urlModel.create(url);
  }

  async findByShortUrl(shortUrl: string): Promise<UrlEntity | null> {
    console.log(shortUrl);
    const originalUrl = await this.urlModel.findOne({ shortUrl });
    return originalUrl || null;
  }
}
