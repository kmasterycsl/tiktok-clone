import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { CommonEntity } from './common.entity';
import { User } from './user.entity';
import { Asset } from './asset.entity';
import { Tweet } from './tweet.entity';

@Entity({
  name: 'comments'
})
export class Comment extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  user_id: number;

  @Column('int')
  tweet_id: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  parent_id?: number;

  @Column({
    type: 'varchar',
  })
  content: string;

  @ManyToOne(type => User, user => user.tweets)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(type => Tweet, asset => asset.comments)
  @JoinColumn({ name: "tweet_id" })
  tweet: Tweet;

  @ManyToOne(type => Comment, asset => asset.parent)
  @JoinColumn({ name: "parent_id" })
  parent: Comment;

  @OneToMany(type => Comment, comment => comment.parent)
  children: Comment[];

  @Column('int', {
    select: false, 
    transformer: {
      from: x => parseInt(x),
      to: x => parseInt(x),
    }
  })
  children_count?: number;

  @Column('int', {
    select: false,
    transformer: {
      from: x => {
        return parseInt(x) > 0;
      },
      to: x => x,
    }
  })
  is_liked?: boolean;


  @Column('int', {
    select: false,
    transformer: {
      from: x => {
        return parseInt(x);
      },
      to: x => x,
    }
  })
  total_likes?: number;
}