import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet, Comment } from '@tiktok-clone/share/entities';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { PostTweetRequest } from './post-tweet.request';
import { LikableType } from 'src/like/consts';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) { }

  getComment(commentId: number): Promise<Comment> {
    const queryBuilder = this.commentRepository
      .createQueryBuilder('c1')
      .where({
        id: commentId,
      })
      .leftJoin('comments', 'c2', 'c1.id = c2.parent_id')
      .leftJoinAndSelect('c1.user', 'c1.user')
      .addSelect('COUNT(c2.id)', 'c1_children_count')
      .orderBy('c1_children_count', 'DESC')
      .groupBy('c1.id');

    return queryBuilder.getOne();
  }

  getRootCommentForTweets(tweetId: string, options: IPaginationOptions & { userId?: number }): any {
    const queryBuilder = this.commentRepository
      .createQueryBuilder('c1')
      .where('c1.tweet_id = :tweetId AND c1.parent_id is NULL', {
        tweetId
      })
      .leftJoin('comments', 'c2', 'c1.id = c2.parent_id')
      .leftJoinAndSelect('c1.user', 'c1.user')
      .addSelect('COUNT(c2.id)', 'c1_children_count')
      .orderBy('c1_children_count', 'DESC')
      .addOrderBy('c1.created_at', 'DESC')
      .groupBy('c1.id')
      .leftJoin('likes', 'likes', 'likes.likable_type = :likableType AND likes.likable_id = c1.id', {
        likableType: LikableType.COMMENT,
      })
      .addSelect(`COUNT(DISTINCT(likes.user_id))`, 'c1_total_likes')

    if (options.userId) {
      queryBuilder
        .leftJoin('likes', 'l', 'l.likable_type = :likableType AND l.likable_id = c1.id and l.user_id = :userId', {
          likableType: LikableType.COMMENT,
          userId: options.userId
        })
        .addSelect(`CASE WHEN COUNT(l.user_id) > 0 THEN 1 ELSE 0 END`, 'c1_is_liked')
    } else {
      queryBuilder.addSelect('0', 'c1_is_liked')
    }


    return paginate<Comment>(queryBuilder, options);
  }

  getChildComment(parentId: string, options: IPaginationOptions & { userId?: number }): any {
    const queryBuilder = this.commentRepository
      .createQueryBuilder('c1')
      .where('c1.parent_id = :parentId', {
        parentId
      })
      .leftJoin('comments', 'c2', 'c1.id = c2.parent_id')
      .leftJoinAndSelect('c1.user', 'c1.user')
      .addSelect('COUNT(c2.id)', 'c1_children_count')
      .orderBy('c1_children_count', 'DESC')
      .addOrderBy('c1.created_at', 'DESC')
      .groupBy('c1.id').leftJoin('likes', 'likes', 'likes.likable_type = :likableType AND likes.likable_id = c1.id', {
        likableType: LikableType.COMMENT,
      })
      .addSelect(`COUNT(DISTINCT(likes.user_id))`, 'c1_total_likes');

    if (options.userId) {
      queryBuilder
        .leftJoin('likes', 'l', 'l.likable_type = :likableType AND l.likable_id = c1.id and l.user_id = :userId', {
          likableType: LikableType.COMMENT,
          userId: options.userId
        })
        .addSelect(`CASE WHEN COUNT(l.user_id) > 0 THEN 1 ELSE 0 END`, 'c1_is_liked')
    } else {
      queryBuilder.addSelect('0', 'c1_is_liked')
    }

    return paginate<Comment>(queryBuilder, options);
  }

  async postTweetComment(params: PostTweetRequest & { userId: number, tweetId: number }): Promise<Comment> {
    const commentData: Partial<Comment> = {
      user_id: params.userId,
      tweet_id: params.tweetId,
      parent_id: params.parent_id,
      content: params.content,
      children_count: 0,
      total_likes: 0,
      is_liked: false,
    }

    const comment = await this.commentRepository.save(commentData);

    return this.getComment(comment.id);
  }
}
