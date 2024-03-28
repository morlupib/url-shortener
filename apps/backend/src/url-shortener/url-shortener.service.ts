import { Inject, Injectable } from '@nestjs/common';
import {
  CachePort,
  ShortenUrlUseCase,
  UrlEntity,
  UrlRepositoryPort,
  UrlShortenerPort,
} from '@url-shortener/shared';

@Injectable()
export class UrlShortenerService implements UrlShortenerPort {
  private readonly shortenerUrlUseCase: ShortenUrlUseCase;

  constructor(
    @Inject('UrlRepositoryPort')
    private readonly urlRepository: UrlRepositoryPort,
    @Inject('CachePort') private readonly cache: CachePort
  ) {
    this.shortenerUrlUseCase = new ShortenUrlUseCase(
      this.urlRepository,
      this.cache
    );
  }

  async shortenUrl(originalUrl: string): Promise<UrlEntity> {
    return this.shortenerUrlUseCase.shortenUrl(originalUrl);
  }

  async getUrl(shortUrl: string): Promise<string> {
    return this.shortenerUrlUseCase.getUrl(shortUrl);
  }
}
