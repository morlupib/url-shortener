import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisCache } from '../infrastructure/cache/redis.cache';
import { MongoDbUrlRepository } from '../infrastructure/mongo/mongodb-url.repository';
import { UrlEntitySchema } from '../infrastructure/mongo/schemas/url.schema';
import { UrlShortenerController } from './url-shortener.controller';
import { UrlShortenerService } from './url-shortener.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UrlEntity', schema: UrlEntitySchema }]),
  ],
  controllers: [UrlShortenerController],
  providers: [
    {
      provide: 'UrlRepositoryPort',
      useClass: MongoDbUrlRepository,
    },
    {
      provide: 'CachePort',
      useClass: RedisCache,
    },
    UrlShortenerService,
  ],
})
export class UrlShortenerModule {}
