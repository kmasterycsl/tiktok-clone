import { Controller, UseGuards, Post, Request, Get, Query, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TweetService } from 'src/tweet/tweet.service';
import { UserService } from './user.service';
import { userInfo } from 'os';
import { NoStrictlyJwtAuthGuard } from 'src/auth/guards/no-strictly-jwt-auth.guard';

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

  @Get(':userId/followers')
  getFollowersOfUser(
    @Param('userId') userId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.userService.getFollowers({
      page,
      limit,
      userId
    });
  }

  @Get(':userId/followings')
  getFollowingsOfUser(
    @Param('userId') userId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.userService.getFollowings({
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
  @UseGuards(NoStrictlyJwtAuthGuard)
  getUser(
    @Param('userId') userId: number,
    @Request() request,
  ) {
    return this.userService.getUser(userId, request.user?.userId);
  }
}
