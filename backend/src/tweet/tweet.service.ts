import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from '@tiktok-clone/share/entities';
import { Repository } from 'typeorm';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
  ) { }

  getTweets(): any {
    return this.tweetRepository.find({
      relations: ['user', 'song', 'video'],
      order: {
        created_at: 'DESC'
      }
    }).then(tweets => {
      // @TODO: handle in somewhere instead of here
      tweets.forEach(tweet => {
        tweet.video.setExtraInfo();
        tweet.song.setExtraInfo();
      });
      return tweets;
    });
  }
}
