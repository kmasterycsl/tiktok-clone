import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { User } from './user.entity';
import { Asset } from './asset.entity';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';
import { TagTweet } from './tag-tweet.entity';


export enum TweetStatus {
  PUBLIC = 'PUBLIC',
  DRAFT = 'DRAFT',
}

@Entity({
  name: 'tweets'
})
export class Tweet extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  user_id: number;

  @Column({type: 'int'})
  song_id: number;

  @Column({type: 'int'})
  video_id: number;

  @Column({
    type: 'enum',
    enum: TweetStatus,
    default: TweetStatus.PUBLIC
  })
  status: TweetStatus;

  @Column({
    type: 'int',
    default: 0
  })
  views_count: number;

  @Column({type: 'varchar'})
  description: string;

  @OneToMany(type => TagTweet, tagTweet => tagTweet.tweet)
  tagTweets: TagTweet[];

  @ManyToOne(type => User, user => user.tweets)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(type => Asset, asset => asset.associated_objects)
  @JoinColumn({ name: "song_id" })
  song: Asset;

  @ManyToOne(type => Asset, user => user.associated_objects)
  @JoinColumn({ name: "video_id" })
  video: Asset;

  @OneToMany(type => Comment, comment => comment.tweet)
  comments: Comment[];

  @Column('int', {
    select: false,
    transformer: {
      from: x => parseInt(x),
      to: x => parseInt(x),
    }
  })
  comments_count?: number;

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