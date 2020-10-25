import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Tweet } from './tweet.entity';
import { Asset } from './asset.entity';
import { Like } from './like.entity';

@Entity({
  name: 'users'
})
export class User extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({
    type: 'varchar',
    select: false
  })
  password: string;

  @Column({ type: 'varchar' })
  phone_number: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  biography: string;

  @OneToMany(type => Tweet, tweet => tweet.user)
  tweets: Tweet[];

  @OneToMany(type => Asset, asset => asset.user)
  assets: Tweet[];

  @OneToMany(type => Like, like => like.user)
  likes: Like[];

  @Column('int', {
    select: false,
    transformer: {
      from: x => {
        return parseInt(x);
      },
      to: x => x,
    }
  })
  total_followers?: number;

  @Column('int', {
    select: false,
    transformer: {
      from: x => {
        return parseInt(x);
      },
      to: x => x,
    }
  })
  total_followings?: number;

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
  total_received_tweet_likes?: number;
}
