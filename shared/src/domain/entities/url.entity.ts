import { v4 as uuidv4 } from 'uuid';

export class UrlEntity {
  readonly id: string;
  readonly originalUrl: string;
  readonly shortUrl: string;
  readonly createdAt: Date;

  constructor(url: string, shortUrl: string) {
    this.id = uuidv4();
    this.originalUrl = url;
    this.shortUrl = shortUrl;
    this.createdAt = new Date();
  }
}
