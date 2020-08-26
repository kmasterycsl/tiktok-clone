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

  getTweets(options: IPaginationOptions): any {
    return paginate<Tweet>(
      this.tweetRepository,
      options,
      {
        relations: ['user', 'song', 'video'],
        order: {
          created_at: 'DESC'
        }
      }
    );
  }
}
