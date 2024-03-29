import { forwardRef, Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag, Tweet } from '@simple-tiktok/share';
import { TagTweet } from '@simple-tiktok/share/entities/tag-tweet.entity';
import { TagController } from './tag.controller';
import { TweetModule } from 'src/tweet/tweet.module';
import { TweetService } from 'src/tweet/tweet.service';

@Module({
  controllers: [TagController],
  providers: [TagService],
  imports: [
    TypeOrmModule.forFeature([Tag, TagTweet, Tweet]),
    forwardRef(() => TweetModule),
  ],
  exports: [
    TagService
  ]
})
export class TagModule { }
