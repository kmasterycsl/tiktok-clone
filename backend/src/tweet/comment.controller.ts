import { Controller, Get, Query, Param } from '@nestjs/common';
import { AppService } from '../app.service';
import { TweetService } from './tweet.service';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly tweetService: TweetService,
    private readonly commentService: CommentService,
  ) { }

  @Get(':parentId/children')
  getChildComments(
    @Param('parentId') parentId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.commentService.getChildComment(parentId, {
      page,
      limit,
    });
  }
}
