import { Controller, UseGuards, Post, Request, Get, Query, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TweetService } from 'src/tweet/tweet.service';
import { UserService } from './user.service';
import { userInfo } from 'os';

@Controller('users')
export class UserController {
  constructor(
    private tweetService: TweetService,
    private userService: UserService,
  ) {

  }

  @Get(':userId/liked-tweets')
  getLikedTweetsOfUser(
    @Param('userId') userId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.tweetService.getLikedTweets({
      page,
      limit,
      userId
    });
  }

  @Get(':userId/public-tweets')
  getPublicTweetsOfUser(
    @Param('userId') userId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.tweetService.getPublicTweets({
      page,
      limit,
      userId
    });
  }

  @Get(':userId/private-tweets')
  getPrivateTweetsOfUser(
    @Param('userId') userId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.tweetService.getPrivateTweets({
      page,
      limit,
      userId
    });
  }

  @Get(':userId')
  getUser(
    @Param('userId') userId: number,
  ) {
    return this.userService.getUser(userId);
  }
}
