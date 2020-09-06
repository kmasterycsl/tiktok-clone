import { Controller, Get, Query, Param, Request, UseGuards } from '@nestjs/common';
import { AppService } from '../app.service';
import { TweetService } from './tweet.service';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('tweets')
export class TweetController {
  constructor(
    private readonly tweetService: TweetService,
    private readonly commentService: CommentService,
  ) { }

  @Get('')
  @UseGuards(JwtAuthGuard)
  getTweets(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Request() request,
  ) {
    return this.tweetService.getTweets({
      page,
      limit,
      userId: request.user?.userId
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
