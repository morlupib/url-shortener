import { UrlEntity } from '../entities/url.entity';

export interface UrlRepositoryPort {
  save(url: UrlEntity): Promise<void>;
  findByShortUrl(shortUrl: string): Promise<UrlEntity | null>;
}
