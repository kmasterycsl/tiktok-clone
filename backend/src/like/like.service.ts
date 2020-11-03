import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { LikeRequest } from './like.request';
import { TweetService } from '../tweet/tweet.service';
import { LikableType } from './consts';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from '@simple-tiktok/share/entities';
import { CommentService } from '../tweet/comment.service';
import { UserService } from '../user/user.service';

@Injectable()
export class LikeService {
    constructor(
        private tweetService: TweetService,
        private commentService: CommentService,
        private userService: UserService,
        @InjectRepository(Like)
        public likeRepository: Repository<Like>,
    ) {
    }

    public async like(params: LikeRequest & { userId: number }): Promise<void> {
        switch (params.likableType) {
            case LikableType.TWEET:
                const tweet = await this.tweetService.getTweet(params.likableId);
                if (!tweet) {
                    throw new NotFoundException('Tweet not found');
                }
                break;
            case LikableType.COMMENT:
                const comment = await this.commentService.getComment(params.likableId);
                if (!comment) {
                    throw new NotFoundException('Comment not found');
                }
                break;
            case LikableType.USER:
                const user = await this.userService.getUser(params.likableId);
                if (!user) {
                    throw new NotFoundException('User not found');
                }
                break;
            default:
                throw new BadRequestException('Likable object is not supported yet');
        }

        const primaryKeys = {
            likable_id: params.likableId,
            likable_type: params.likableType,
            user_id: params.userId,
        };

        const existLike = await this.likeRepository.findOne({
            where: primaryKeys,
        });

        if (existLike) {
            await this.likeRepository.delete(primaryKeys);
        } else {
            await this.likeRepository.save(primaryKeys);
        }
    }
}
