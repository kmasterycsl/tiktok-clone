import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';
import { TweetService } from './tweet.service';

@Controller('tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) { }

  @Get('')
  getTweets() {
    return this.tweetService.getTweets();
  }
}
