import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from 'src/entities/tweet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
  ) {}
  
  getTweets(): any {
    return this.tweetRepository.find({
      relations: ['user', 'song', 'video'],
      order: {
        created_at: 'DESC'
      }
    });
  }
}
