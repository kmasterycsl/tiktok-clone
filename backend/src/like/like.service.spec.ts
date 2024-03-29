import { Test } from '@nestjs/testing';
import { User } from '@simple-tiktok/share/entities';
import { LikeService } from './like.service';
import { LikeRequest } from './like.request';
import { Like, Tweet, TagTweet, Comment, Tag } from '@simple-tiktok/share';
import { TweetService } from 'src/tweet/tweet.service';
import { CommentService } from 'src/tweet/comment.service';
import { UserService } from 'src/user/user.service';
import { TagService } from 'src/tag/tag.service';
import { LikableType } from './consts';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { mockProvideForRepository, mockProviderForAllRepositories } from '@test/utils';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('LikeServiceTest', () => {
    let likeService: LikeService;
    let tweetService: TweetService;
    let userService: UserService;
    let commentService: CommentService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                ...mockProviderForAllRepositories,
                LikeService,
                TweetService,
                CommentService,
                UserService,
                TagService,
            ],
        }).compile();
        likeService = moduleRef.get<LikeService>(LikeService);
        userService = moduleRef.get<UserService>(UserService);
        commentService = moduleRef.get<CommentService>(CommentService);
        tweetService = moduleRef.get<TweetService>(TweetService);
    });

    it('i should throw error if type is not supported', async () => {
        const likeRequest: LikeRequest & { userId: number } = {
            likableId: 0,
            likableType: 'SOME-DUMMY-TYPE',
            userId: 0,
        };
        await expect(likeService.like(likeRequest)).rejects.toThrow(BadRequestException);
        return;
    });

    it('i should throw error if tweet id is not founded', async () => {
        jest.spyOn(tweetService, 'getTweet').mockReturnValue(Promise.resolve(undefined));

        const likeRequest: LikeRequest & { userId: number } = {
            likableId: 0,
            likableType: LikableType.TWEET,
            userId: 0,
        };
        await expect(likeService.like(likeRequest)).rejects.toThrow(NotFoundException);
        return;
    });

    it('i should throw error if user id is not founded', async () => {
        jest.spyOn(userService, 'getUser').mockReturnValue(Promise.resolve(undefined));

        const likeRequest: LikeRequest & { userId: number } = {
            likableId: 0,
            likableType: LikableType.USER,
            userId: 0,
        };
        await expect(likeService.like(likeRequest)).rejects.toThrow(NotFoundException);
        return;
    });

    it('i should throw error if comment id is not founded', async () => {
        jest.spyOn(commentService, 'getComment').mockReturnValue(Promise.resolve(undefined));

        const likeRequest: LikeRequest & { userId: number } = {
            likableId: 0,
            likableType: LikableType.COMMENT,
            userId: 0,
        };
        await expect(likeService.like(likeRequest)).rejects.toThrow(NotFoundException);
        return;
    });
});