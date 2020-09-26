import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Tag, Tweet } from '@tiktok-clone/share';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { keyBy } from 'lodash';
import { TweetService } from 'src/tweet/tweet.service';
import { TagTweet } from '@tiktok-clone/share/entities/tag-tweet.entity';

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


  async getTags(options: IPaginationOptions & { userId?: number }): Promise<any> {
    const tagQueryBuilder = this.tagRepository
      .createQueryBuilder('tags')
      .orderBy('tags.created_at', 'DESC');

    const paginateResult = await paginate<Tag>(tagQueryBuilder, options);

    const tagIds = paginateResult.items.map(tag => tag.id);

    const tagTweets = await this.tagTweetRepository
      .createQueryBuilder()
      .where(`tag_id in (:tagIds)`, { tagIds })
      .getMany();

    const tweetIds = tagTweets.map(tagTweet => tagTweet.tweet_id);

    const tweets = await this.tweetService
      .loadCommonStuffs()
      .where(`tweets.id IN (:tweetIds)`, {
        tweetIds
      })
      .getMany();

    const tweetById = keyBy(tweets, 'id');

    paginateResult.items.forEach(tag => {
      tag.tweets = [];
      tag.tagTweets.forEach(tagTweet => {
        tag.tweets.push(tweetById[tagTweet.tweet_id]);
      });
    })

    return paginateResult;
  }
}
