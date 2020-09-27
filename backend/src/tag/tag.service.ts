import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Tag, Tweet } from '@tiktok-clone/share';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { keyBy } from 'lodash';
import { TweetService } from 'src/tweet/tweet.service';
import { TagTweet } from '@tiktok-clone/share/entities/tag-tweet.entity';
import { LikableType } from 'src/like/consts';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(TagTweet)
    private tagTweetRepository: Repository<TagTweet>,
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
    private tweetService: TweetService,
  ) { }

  async getTag(tagId: number) {
    return this.tagRepository.findOne(tagId);
  }


  async getTags(options: IPaginationOptions & { userId?: number }): Promise<any> {
    const tagQueryBuilder = this.tagRepository
      .createQueryBuilder('tags')
      .leftJoin('tags.tagTweets', 'tagTweets')
      .leftJoin('tagTweets.tweet', 'tweet')
      .leftJoin('likes', 'likes', 'likes.likable_type = :likableType and likes.likable_id = tweet.id', {
        likableType: LikableType.TWEET,
      })
      .addSelect(`COUNT(DISTINCT(likes.user_id))`, 'tags_total_likes')
      .groupBy('tags.id')
      .orderBy('tags_total_likes', 'DESC');

    const paginateResult = await paginate<Tag>(tagQueryBuilder, options);

    const tagTweets = [];

    // @TODO: can do with window function to reduce number of queries here
    for (const tag of paginateResult.items) {
      const tagTweetsOfTag = await this.tagTweetRepository
        .createQueryBuilder()
        .where(`tag_id = :tagId`, { tagId: tag.id })
        .orderBy('created_at', 'DESC')
        .limit(5)
        .getMany();
      tagTweets.push(...tagTweetsOfTag);
    }

    const tweetIds = tagTweets.map(tagTweet => tagTweet.tweet_id);

    const tweets = await this.tweetService
      .loadCommonStuffs()
      .where(`tweets.id IN (:tweetIds)`, {
        tweetIds
      })
      .getMany();

  
    // @TODO: find some way to resolve this duplicated code
    tweets.forEach(tweet => {
      tweet.video.setExtraInfo();
      tweet.song.setExtraInfo();
    })

    const tweetById = keyBy(tweets, 'id');

    paginateResult.items.forEach(tag => {
      tag.tweets = [];
      for (const tagTweet of tagTweets) {
        if (tag.id !== tagTweet.tag_id) {
          continue;
        }
        tag.tweets.push(tweetById[tagTweet.tweet_id]);
      }
    })

    return paginateResult;
  }
}
