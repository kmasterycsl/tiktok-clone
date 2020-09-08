import { Injectable } from '@nestjs/common';
import { User, Like } from '@tiktok-clone/share/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getManager } from "typeorm";
import { LikableType } from 'src/like/consts';

@Injectable()
export class UserService {
  private readonly users: User[];
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
  ) {
  }

  async findOneByPhoneNumber(phoneNumber: string, selectFields?): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { phone_number: phoneNumber }, select: selectFields });
  }

  async getUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOne(userId);

    const data1 = await this.likeRepository.createQueryBuilder('likes')
      .innerJoin('tweets', 'tweets', 'likes.likable_id = tweets.id AND likes.likable_type = :likableType AND tweets.user_id = :userId', {
        userId,
        likableType: LikableType.TWEET
      })
      .select('COUNT(*) as total_received_tweet_likes')
      .getRawOne();

    user.total_received_tweet_likes = +data1.total_received_tweet_likes;
    // @TODO
    user.total_followers = 0;
    // @TODO
    user.total_followings = 0;

    return user;
  }
}