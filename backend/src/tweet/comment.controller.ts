import { Controller, Get, Query, Request, Param, UseGuards } from '@nestjs/common';
import { AppService } from '../app.service';
import { TweetService } from './tweet.service';
import { CommentService } from './comment.service';
import { NoStrictlyJwtAuthGuard } from 'src/auth/guards/no-strictly-jwt-auth.guard';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly tweetService: TweetService,
    private readonly commentService: CommentService,
  ) { }

  @UseGuards(NoStrictlyJwtAuthGuard)
  @Get(':parentId/children')
  getChildComments(
    @Param('parentId') parentId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Request() request,
  ) {
    return this.commentService.getChildComment(parentId, {
      page,
      limit,
      userId: request.user?.userId
    });
  }
}
