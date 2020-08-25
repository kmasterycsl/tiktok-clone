import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { CommonEntity } from './common.entity';
import { User } from './user.entity';
import { Asset } from './asset.entity';

@Entity({
  name: 'tweets'
})
export class Tweet extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  song_id: number;

  @Column()
  video_id: number;

  @Column()
  description: string;

  @ManyToOne(type => User, user => user.tweets)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(type => Asset, asset => asset.associated_objects)
  @JoinColumn({ name: "song_id" })
  song: Asset;

  @ManyToOne(type => Asset, user => user.associated_objects)
  @JoinColumn({ name: "video_id" })
  video: Asset;
}