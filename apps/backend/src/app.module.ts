import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    UrlShortenerModule,
  ],
})
export class AppModule {}
