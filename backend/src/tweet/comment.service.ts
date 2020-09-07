import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet, Comment } from '@tiktok-clone/share/entities';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { PostTweetRequest } from './post-tweet.request';

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

  getRootCommentForTweets(tweetId: string, options: IPaginationOptions): any {
    const queryBuilder = this.commentRepository
      .createQueryBuilder('c1')
      .where({
        tweet_id: tweetId,
        parent_id: null
      })
      .leftJoin('comments', 'c2', 'c1.id = c2.parent_id')
      .leftJoinAndSelect('c1.user', 'c1.user')
      .addSelect('COUNT(c2.id)', 'c1_children_count')
      .orderBy('c1_children_count', 'DESC')
      .addOrderBy('c1.created_at', 'DESC')
      .groupBy('c1.id');


    return paginate<Comment>(queryBuilder, options);
  }

  getChildComment(parentId: string, options: IPaginationOptions): any {
    const queryBuilder = this.commentRepository
      .createQueryBuilder('c1')
      .where({
        parent_id: parentId

      })
      .leftJoin('comments', 'c2', 'c1.id = c2.parent_id')
      .leftJoinAndSelect('c1.user', 'c1.user')
      .addSelect('COUNT(c2.id)', 'c1_children_count')
      .orderBy('c1_children_count', 'DESC')
      .addOrderBy('c1.created_at', 'DESC')
      .groupBy('c1.id');

    return paginate<Comment>(queryBuilder, options);
  }

  async postTweetComment(params: PostTweetRequest & { userId: number, tweetId: number }): Promise<Comment> {
    const commentData: Partial<Comment> = {
      user_id: params.userId,
      tweet_id: params.tweetId,
      parent_id: params.parent_id,
      content: params.content,
      children_count: 0,
    }

    const comment = await this.commentRepository.save(commentData);

    return this.getComment(comment.id);
  }
}
