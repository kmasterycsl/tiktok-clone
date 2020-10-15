import { Injectable } from '@nestjs/common';
import { User, Like, Tweet } from '@tiktok-clone/share/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getManager } from "typeorm";
import { LikableType } from 'src/like/consts';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

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

  async getUser(userId: number, actionUserId?: number): Promise<User> {
    const user = await this.userRepository.findOne(userId);

    const queryBuilder1 = this.likeRepository.createQueryBuilder('likes')
      .innerJoin('tweets', 'tweets', 'likes.likable_id = tweets.id AND likes.likable_type = :likableType AND tweets.user_id = :userId', {
        userId,
        likableType: LikableType.TWEET
      })
      .select('COUNT(*) as total_received_tweet_likes')

    let isLiked: boolean;
    if (actionUserId) {
      const data2 = await this.likeRepository
        .createQueryBuilder('likes')
        .where(`likes.likable_type = :likableType and likes.likable_id = :userId and likes.user_id = :actionUserId`, {
          likableType: LikableType.USER,
          userId,
          actionUserId
        })
        .addSelect(`CASE WHEN COUNT(likes.user_id) > 0 THEN 1 ELSE 0 END`, 'is_liked')
        .getRawOne();
      isLiked = data2.is_liked === '1';
    } else {
      isLiked = false;
    }

    const data3 = await this.likeRepository
      .createQueryBuilder('likes')
      .where(`likes.likable_type = :likableType and likes.likable_id = :userId`, {
        likableType: LikableType.USER,
        userId,
      })
      .select(`COUNT(*)`, 'total_followers')
      .getRawOne();

    const data4 = await this.likeRepository
      .createQueryBuilder('likes')
      .where(`likes.likable_type = :likableType and likes.user_id = :userId`, {
        likableType: LikableType.USER,
        userId,
      })
      .select(`COUNT(*)`, 'total_followings')
      .getRawOne();

    const data = await queryBuilder1.getRawOne();

    user.total_received_tweet_likes = +data.total_received_tweet_likes;

    user.total_followers = +data3.total_followers;

    user.total_followings = +data4.total_followings;

    user.is_liked = isLiked;

    return user;
  }

  getFollowers(options: IPaginationOptions & { userId: number }): any {
    const queryBuilder = this.userRepository
      .createQueryBuilder('users')
      .innerJoin('likes', 'likes', 'likes.user_id = users.id AND likes.likable_type = :likableType', {
        likableType: LikableType.USER,
      })
      .where(`likes.likable_id = :userId`, {
        userId: options.userId,
      });

    return paginate<User>(queryBuilder, options);
  }

  getFollowings(options: IPaginationOptions & { userId: number }): any {
    const queryBuilder = this.userRepository
      .createQueryBuilder('users')
      .innerJoin('likes', 'likes', 'likes.likable_id = users.id AND likes.likable_type = :likableType', {
        likableType: LikableType.USER,
      })
      .where(`likes.user_id = :userId`, {
        userId: options.userId,
      });

    return paginate<User>(queryBuilder, options);
  }
}