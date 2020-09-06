import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from '@tiktok-clone/share/entities';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { LikableType } from 'src/like/consts';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
  ) { }

  getTweet(tweetId: number) {
    return this.tweetRepository.findOne(tweetId);
  }

  getTweets(options: IPaginationOptions & { userId?: number }): any {
    const queryBuilder = this.tweetRepository
      .createQueryBuilder('tweets')
      .leftJoinAndSelect('tweets.user', 'user')
      .leftJoinAndSelect('tweets.song', 'song')
      .leftJoinAndSelect('tweets.video', 'video')
      .leftJoin('comments', 'comments', 'comments.tweet_id = tweets.id')
      .addSelect('COUNT(comments.id)', 'tweets_comments_count')
      .orderBy('tweets.created_at', 'DESC')
      .groupBy('tweets.id')
      .leftJoin('likes', 'l2', 'l2.likable_type = :likableType and l2.likable_id = tweets.id', {
        likableType: LikableType.TWEET,
      })
      .addSelect(`COUNT(DISTINCT(l2.user_id))`, 'tweets_total_likes')

    if (options.userId) {
      queryBuilder
        .leftJoin('likes', 'l', 'l.likable_type = :likableType and l.likable_id = tweets.id and l.user_id = :userId', {
          likableType: LikableType.TWEET,
          userId: options.userId
        })
        .addSelect(`CASE WHEN COUNT(l.user_id) > 0 THEN 1 ELSE 0 END`, 'tweets_is_liked')
    } else {
      queryBuilder.addSelect('0', 'tweets_is_liked')
    }

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
