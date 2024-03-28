import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UrlDocument extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true })
  shortUrl: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UrlEntitySchema = SchemaFactory.createForClass(UrlDocument);
