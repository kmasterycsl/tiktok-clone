import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, PrimaryColumn, JoinTable, ManyToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { TagTweet } from './tag-tweet.entity';
import { Tweet } from './tweet.entity';
import { User } from './user.entity';

@Entity({
    name: 'tags'
})
export class Tag extends CommonEntity {
    constructor(
    ) {
        super();
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    @Column()
    description: string;

    @Column()
    created_user_id: number;

    @OneToMany(type => TagTweet, tagTweet => tagTweet.tag)
    tagTweets: TagTweet[];

    @JoinColumn({ name: "created_user_id" })
    user: User;
}