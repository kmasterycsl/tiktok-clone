import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from '@tiktok-clone/share/entities';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { LikableType } from 'src/like/consts';
import { TagTweet } from '@tiktok-clone/share/entities/tag-tweet.entity';
import { uniq } from 'lodash';
import { TagService } from 'src/tag/tag.service';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
    @InjectRepository(TagTweet)
    private tagTweetRepository: Repository<TagTweet>,
    @Inject(forwardRef(() => TagService))
    private tagService: TagService,
  ) { }

  async postTweet(userId: number, description: string, video_id: number, song_id: number): Promise<Tweet> {
    const tweet: Partial<Tweet> = {
      user_id: userId,
      song_id,
      video_id,
      description,
      // @TODO: hack ambigious error
      comments_count: 0,
      is_liked: false,
      total_likes: 0,
    }
    const { id } = await this.tweetRepository.save(tweet);

    const tagSlugsRegex = new RegExp(/#([^ ]*)/gm);
    let [_, ...tagSlugs] = tagSlugsRegex.exec(tweet.description);
    tagSlugs = uniq(tagSlugs);

    const tags = await this.tagService.getOrCreateTagsFromSlugs(tagSlugs, userId);
    for (const tag of tags) {
      this.tagTweetRepository.save({
        tag_id: tag.id,
        tweet_id: id,
      });
    }

    return this.getTweet(id);
  }

  getTweet(tweetId: number): Promise<Tweet> {
    return this.tweetRepository.findOne(tweetId);
  }

  getLikedTweets(options: IPaginationOptions & { userId: number }): any {
    const queryBuilder = this
      .loadCommonStuffs(options.userId)
      .where('likes.user_id = :userId', {
        userId: options.userId,
      })
      .orderBy('likes.created_at', 'DESC');

    return paginate<Tweet>(queryBuilder, options).then(result => {
      result.items.map(tweet => {
        tweet.video.setExtraInfo();
        tweet.song.setExtraInfo();
      });
      return result;
    });
  }

  getPublicTweets(options: IPaginationOptions & { userId: number }): any {
    const queryBuilder = this
      .loadCommonStuffs(options.userId)
      .where('tweets.user_id = :ownerId', {
        ownerId: options.userId,
      })
      .orderBy('tweets.created_at', 'DESC');

    return paginate<Tweet>(queryBuilder, options).then(result => {
      result.items.map(tweet => {
        tweet.video.setExtraInfo();
        tweet.song.setExtraInfo();
      });
      return result;
    });
  }

  getPrivateTweets(options: IPaginationOptions & { userId: number }): any {
    const queryBuilder = this
      .loadCommonStuffs(options.userId)
      .where('tweets.user_id = :ownerId', {
        ownerId: options.userId,
      })
      .orderBy('tweets.created_at', 'DESC');

    return paginate<Tweet>(queryBuilder, options).then(result => {
      result.items.map(tweet => {
        tweet.video.setExtraInfo();
        tweet.song.setExtraInfo();
      });
      return result;
    });
  }

  getTweets(options: IPaginationOptions & { userId?: number }): any {
    const queryBuilder = this
      .loadCommonStuffs(options.userId)
      .orderBy('tweets.created_at', 'DESC');

    return paginate<Tweet>(queryBuilder, options).then(result => {
      result.items.map(tweet => {
        tweet.video.setExtraInfo();
        tweet.song.setExtraInfo();
      });
      return result;
    });
  }

  async getTagTweets(options: IPaginationOptions & { tagId: number }): Promise<any> {
    const tagQueryBuilder = this
      .loadCommonStuffs()
      .innerJoin('tweets.tagTweets', 'tagTweets')
      .where('tagTweets.tag_id = :tagId', { tagId: options.tagId })
      .orderBy('tweets.created_at', 'DESC');

    return paginate<Tweet>(tagQueryBuilder, options).then(result => {
      result.items.map(tweet => {
        tweet.video.setExtraInfo();
        tweet.song.setExtraInfo();
      });
      return result;
    });
  }

  public loadCommonStuffs(userId?: number): SelectQueryBuilder<Tweet> {
    const queryBuilder = this.tweetRepository.createQueryBuilder('tweets')
      .leftJoinAndSelect('tweets.user', 'user')
      .leftJoinAndSelect('tweets.song', 'song')
      .leftJoinAndSelect('tweets.video', 'video')
      .leftJoinAndSelect('video.thumbnail', 'thumbnail')
      .leftJoin('comments', 'comments', 'comments.tweet_id = tweets.id')
      .leftJoin('likes', 'likes2', 'likes2.likable_type = :likableType and likes2.likable_id = tweets.id', {
        likableType: LikableType.TWEET,
      })
      .addSelect(`COUNT(DISTINCT(likes2.user_id))`, 'tweets_total_likes')
      .addSelect('COUNT(comments.id)', 'tweets_comments_count')
      .groupBy('tweets.id')

    if (userId) {
      queryBuilder
        .leftJoinAndSelect('likes', 'likes', 'likes.likable_type = :likableType and likes.likable_id = tweets.id and likes.user_id = :userId', {
          likableType: LikableType.TWEET,
          userId: userId
        })
        .addSelect(`CASE WHEN COUNT(likes.user_id) > 0 THEN 1 ELSE 0 END`, 'tweets_is_liked')
    } else {
      queryBuilder.addSelect('0', 'tweets_is_liked')
    }

    return queryBuilder;
  }
}
