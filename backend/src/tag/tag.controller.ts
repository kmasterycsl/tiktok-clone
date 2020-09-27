import { Controller, Get, Query, Param, Request, UseGuards, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { NoStrictlyJwtAuthGuard } from 'src/auth/guards/no-strictly-jwt-auth.guard';
import { TweetService } from 'src/tweet/tweet.service';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(
    private tagService: TagService,
    private tweetService: TweetService,
  ) {

  }
  @Get('')
  getTags(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Request() request,
  ) {
    return this.tagService.getTags({
      page,
      limit,
      userId: request.user?.userId
    });
  }

  @Get(':tagId')
  getTag(
    @Param('tagId') tagId: number,
  ) {
    return this.tagService.getTag(tagId);
  }

  @Get(':tagId/tweets')
  getTweetsOftag(
    @Param('tagId') tagId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.tweetService.getTagTweets({
      page,
      limit,
      tagId
    });
  }
}
