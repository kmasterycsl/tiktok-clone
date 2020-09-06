import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from '@tiktok-clone/share/entities';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
  ) { }

  getTweet(tweetId: number) {
    return this.tweetRepository.findOne(tweetId);
  }

  getTweets(options: IPaginationOptions): any {
    const queryBuilder = this.tweetRepository
      .createQueryBuilder('tweets')
      .leftJoinAndSelect('tweets.user', 'user')
      .leftJoinAndSelect('tweets.song', 'song')
      .leftJoinAndSelect('tweets.video', 'video')
      .leftJoin('comments', 'comments', 'comments.tweet_id = tweets.id')
      .addSelect('COUNT(comments.id)', 'tweets_comments_count')
      .orderBy('tweets.created_at', 'DESC')
      .groupBy('tweets.id');

    return paginate<Tweet>(queryBuilder, options).then(result => {
      result.items.map(tweet => {
        tweet.video.setExtraInfo();
        tweet.song.setExtraInfo();
      });
      return result;
    });

    // return paginate<Tweet>(
    //   this.tweetRepository,
    //   options,
    //   {
    //     relations: ['user', 'song', 'video'],
    //     order: {
    //       created_at: 'DESC'
    //     }
    //   }
    // ).then(result => {
    //   result.items.map(tweet => {
    //     tweet.video.setExtraInfo();
    //     tweet.song.setExtraInfo();
    //   });
    //   return result;
    // });
  }
}
