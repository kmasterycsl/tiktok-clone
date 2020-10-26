import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { NoStrictlyJwtAuthGuard } from 'src/auth/guards/no-strictly-jwt-auth.guard';
import { PostTweetCommentRequest } from './post-tweet-comment.request';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import * as multer from 'multer';
import { extname } from 'path';
import { PostTweetRequest } from './post-tweet.request';
import { AssetService } from 'src/asset/asset.service';

export const videoFilter = (req, file, callback) => {
  if (file.mimetype !== 'video/mp4' || !file.originalname.match(/\.(mp4)$/)) {
    return callback(new BadRequestException('Only mp4 videos are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

@Controller('tweets')
export class TweetController {
  constructor(
    private readonly tweetService: TweetService,
    private readonly commentService: CommentService,
    private readonly assetService: AssetService,
  ) { }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.diskStorage({
      destination: './public/videos',
      filename: editFileName,
    }),
    fileFilter: videoFilter,
    limits: {
      fileSize: 100 * 1000 * 1000 // 100mb
    }
  }))
  async post(
    @UploadedFile() file: Express.Multer.File,
    @Body() params: PostTweetRequest,
    @Request() request,
  ) {
    const asset = await this.assetService.saveAsset({
      user_id: request.user.userId,
      title: 'video',
      file_mime: file.mimetype,
      file_name: file.filename,
      file_extension: extname(file.filename).replace('.', ''),
      file_relative_path: file.destination.replace('./public', ''),
    });

    const tweet = this.tweetService.postTweet(request.user.userId, params.description, asset.id, 1, params.status);

    return tweet;
  }

  @Get('')
  @UseGuards(NoStrictlyJwtAuthGuard)
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
  @UseGuards(NoStrictlyJwtAuthGuard)
  getTweetRootComments(
    @Param('tweetId') tweetId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Request() request,
  ) {
    return this.commentService.getRootCommentForTweets(tweetId, {
      page,
      limit,
      userId: request.user?.userId
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post(':tweetId/comments')
  postComment(
    @Param('tweetId') tweetId: number,
    @Body() params: PostTweetCommentRequest,
    @Request() request,
  ) {
    return this.commentService.postTweetComment({
      ...params,
      userId: request.user.userId,
      tweetId,
    });
  }
}
