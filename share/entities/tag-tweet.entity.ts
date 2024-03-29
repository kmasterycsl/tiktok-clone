import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, PrimaryColumn, JoinTable, ManyToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Tag } from './tag.entity';
import { Tweet } from './tweet.entity';
import { User } from './user.entity';

@Entity({
    name: 'tag_tweet'
})
export class TagTweet extends CommonEntity {
    constructor(
    ) {
        super();
    }
    @PrimaryColumn({type: 'int'})
    tag_id: number;

    @PrimaryColumn({type: 'int'})
    tweet_id: number;

    @ManyToOne(type => Tag, tag => tag.tagTweets)
    @JoinColumn({ name: "tag_id" })
    tag: Tag;

    @ManyToOne(type => Tweet, tweet => tweet.tagTweets)
    @JoinColumn({ name: "tweet_id" })
    tweet: Tweet;
}