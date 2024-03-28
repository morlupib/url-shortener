import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UrlDto } from './dto/url.dto';
import { UrlShortenerService } from './url-shortener.service';

@Controller('url')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post()
  async shortenUrl(@Body() urlDto: UrlDto) {
    const { url } = urlDto;
    return await this.urlShortenerService.shortenUrl(url);
  }

  @Get(':shortUrl')
  async getOriginalUrl(@Param('shortUrl') shortUrl: string) {
    return await this.urlShortenerService.getUrl(shortUrl);
  }
}
