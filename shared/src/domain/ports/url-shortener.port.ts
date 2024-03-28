import { UrlEntity } from '../entities/url.entity';

export interface UrlShortenerPort {
  shortenUrl(originalUrl: string): Promise<UrlEntity>;
  getUrl(shortUrl: string): Promise<string>;
}
