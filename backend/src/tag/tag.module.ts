import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag, Tweet } from '@tiktok-clone/share';
import { TagTweet } from '@tiktok-clone/share/entities/tag-tweet.entity';
import { TagController } from './tag.controller';
import { TweetModule } from 'src/tweet/tweet.module';

@Module({
  controllers: [TagController],
  providers: [TagService],
  imports: [
    TypeOrmModule.forFeature([Tag, TagTweet, Tweet]),
    TweetModule,
  ]
})
export class TagModule {}
