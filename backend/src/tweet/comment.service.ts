import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet, Comment } from '@tiktok-clone/share/entities';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) { }

  getRootCommentForTweets(tweetId: string, options: IPaginationOptions): any {
    // const queryBuilder = this.commentRepository
    //   .createQueryBuilder('comment')
    //   .where({
    //     tweet_id: tweetId,
    //     parent_id: null
    //   })
    //   .loadRelationCountAndMap('children_count', 'children')
    //   .orderBy('children_count', 'DESC');

    // const queryBuilder = this.commentRepository
    //   .createQueryBuilder('c1')
    //   .where({
    //     tweet_id: tweetId,
    //     parent_id: null
    //   })
    //   .addSelect(sq => {
    //     return sq.select(`COUNT(id) as total_children`).from('comments', 'c2').where('c1.id = c2.parent_id');
    //   }, 'c1_children_count')
    //   .orderBy('c1_children_count', 'DESC').printSql();

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
      .groupBy('c1.id');


    return paginate<Comment>(queryBuilder, options);
    // return paginate<Comment>(
    //   this.commentRepository,
    //   options,
    //   {
    //     where: {
    //       tweet_id: tweetId,
    //       parent_id: null,
    //     },
    //     order: {
    //       created_at: 'DESC'
    //     },
    //   }
    // );
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
      .groupBy('c1.id');

    return paginate<Comment>(queryBuilder, options);
  }
}
