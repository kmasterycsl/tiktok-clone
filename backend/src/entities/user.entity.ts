import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Tweet } from './tweet.entity';
import { Asset } from './asset.entity';

@Entity({
  name: 'users'
})
export class User extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  phone_number: string;

  @OneToMany(type => Tweet, tweet => tweet.user)
  tweets: Tweet[];

  @OneToMany(type => Asset, asset => asset.user)
  assets: Tweet[];
}
