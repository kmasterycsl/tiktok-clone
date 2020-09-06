import { Controller, Body, Post, UseGuards, Request, Res, Response } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeRequest } from './like.request';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('likes')
export class LikeController {
    constructor(
        private likeService: LikeService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('')
    async toggleLike(@Body() params: LikeRequest, @Request() request) {
        await this.likeService.like({
            ...params,
            userId: request.user.userId
        });
        return {
            message: 'Action successfully'
        }
    }
}
