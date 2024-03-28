import { UrlEntity } from '../entities/url.entity';
import { CachePort } from '../ports/cache.port';
import { UrlRepositoryPort } from '../ports/url-repository.port';
import { UrlShortenerPort } from '../ports/url-shortener.port';

export class ShortenUrlUseCase implements UrlShortenerPort {
  constructor(
    private readonly urlRepository: UrlRepositoryPort,
    private readonly cache: CachePort
  ) {}

  async shortenUrl(originalUrl: string): Promise<UrlEntity> {
    const shortUrl = this.generateShortUrl();
    const urlEntity = new UrlEntity(originalUrl, shortUrl);

    await this.urlRepository.save(urlEntity);
    await this.cache.set(shortUrl, originalUrl);

    return urlEntity;
  }

  async getUrl(shortUrl: string): Promise<string> {
    const cachedUrl = await this.cache.get(shortUrl);
    if (cachedUrl) {
      return cachedUrl;
    }

    const urlEntity = await this.urlRepository.findByShortUrl(shortUrl);
    if (!urlEntity) {
      throw new Error('Url not found');
    }

    await this.cache.set(shortUrl, urlEntity.originalUrl);

    return urlEntity.originalUrl;
  }

  private generateShortUrl(): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortUrl = '';
    for (let i = 0; i < 6; i++) {
      shortUrl += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return shortUrl;
  }
}
