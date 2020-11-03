import { forwardRef, Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet, Comment, Tag } from '@simple-tiktok/share/entities';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { AssetModule } from 'src/asset/asset.module';
import { TagTweet } from '@simple-tiktok/share/entities/tag-tweet.entity';
import { TagModule } from 'src/tag/tag.module';

@Module({
  controllers: [TweetController, CommentController],
  providers: [TweetService, CommentService],
  imports: [
    TypeOrmModule.forFeature([Tweet, Comment, Tag, TagTweet]),
    AssetModule,
    forwardRef(() => TagModule),
  ],
  exports: [TweetService, CommentService]
})
export class TweetModule { }
