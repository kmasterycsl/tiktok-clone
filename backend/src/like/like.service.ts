import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { LikeRequest } from './like.request';
import { TweetService } from 'src/tweet/tweet.service';
import { LikableType } from './consts';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from '@tiktok-clone/share/entities';

@Injectable()
export class LikeService {
    constructor(
        private tweetService: TweetService,
        @InjectRepository(Like)
        private tweetRepository: Repository<Like>,
    ) {
    }
    public async like(params: LikeRequest & { userId: number }) {
        switch (params.likableType) {
            case LikableType.TWEET:
                const tweet = this.tweetService.getTweet(params.likableId);
                if (!tweet) {
                    throw new NotFoundException('Tweet not found');
                }
                break;
            default:
                throw new BadRequestException('Likable object is not supported yet');
        }

        const primaryKeys = {
            likable_id: params.likableId.toString(),
            likable_type: params.likableType,
            user_id: params.userId
        };

        const existLike = await this.tweetRepository.findOne({
            where: primaryKeys
        });

        if (existLike) {
            await this.tweetRepository.delete(primaryKeys);
        } else {
            await this.tweetRepository.save(primaryKeys);
        }
    }
}
