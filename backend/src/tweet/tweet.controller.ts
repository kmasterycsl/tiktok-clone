import { Controller, Get, Query, Param } from '@nestjs/common';
import { AppService } from '../app.service';
import { TweetService } from './tweet.service';
import { CommentService } from './comment.service';

@Controller('tweets')
export class TweetController {
  constructor(
    private readonly tweetService: TweetService,
    private readonly commentService: CommentService,
  ) { }

  @Get('')
  getTweets(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.tweetService.getTweets({
      page,
      limit,
    });
  }

  @Get(':tweetId/comments')
  getTweetRootComments(
    @Param('tweetId') tweetId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.commentService.getRootCommentForTweets(tweetId, {
      page,
      limit,
    });
  }
}
