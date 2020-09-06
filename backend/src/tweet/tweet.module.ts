import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet, Comment } from '@tiktok-clone/share/entities';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  controllers: [TweetController, CommentController],
  providers: [TweetService, CommentService],
  imports: [
    TypeOrmModule.forFeature([Tweet, Comment])
  ],
  exports: [TweetService]
})
export class TweetModule { }
