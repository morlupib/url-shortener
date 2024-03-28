import { Injectable } from '@nestjs/common';
import { CachePort } from '@url-shortener/shared';
import { Redis } from 'ioredis';

@Injectable()
export class RedisCache implements CachePort {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  async get(key: string): Promise<string | null> {
    const value = await this.redisClient.get(key);
    return value || null;
  }

  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }
}
