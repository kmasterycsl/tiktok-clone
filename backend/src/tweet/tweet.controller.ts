import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from '../app.service';
import { TweetService } from './tweet.service';

@Controller('tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) { }

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
}
