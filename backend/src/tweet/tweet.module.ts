import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet, Comment, Tag } from '@tiktok-clone/share/entities';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { AssetModule } from 'src/asset/asset.module';
import { TagTweet } from '@tiktok-clone/share/entities/tag-tweet.entity';

@Module({
  controllers: [TweetController, CommentController],
  providers: [TweetService, CommentService],
  imports: [
    TypeOrmModule.forFeature([Tweet, Comment, Tag, TagTweet]),
    AssetModule,
  ],
  exports: [TweetService, CommentService]
})
export class TweetModule { }
