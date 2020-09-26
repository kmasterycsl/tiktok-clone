import { Controller, Get, Query, Param, Request, UseGuards, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { NoStrictlyJwtAuthGuard } from 'src/auth/guards/no-strictly-jwt-auth.guard';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
    constructor(
        private tagService: TagService,
    ) {

    }
    @Get('')
    @UseGuards(NoStrictlyJwtAuthGuard)
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
}
