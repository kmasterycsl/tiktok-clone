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

  @Column()
  user_id: number;

  @Column()
  tweet_id: number;

  @Column({
    nullable: true,
  })
  parent_id?: number;

  @Column()
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
}