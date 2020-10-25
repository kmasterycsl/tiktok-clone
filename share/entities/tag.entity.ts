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

    @Column({type: 'varchar'})
    slug: string;

    @Column({
        type: 'text'
    })
    description: string;

    @Column({type: 'int'})
    created_user_id: number;

    @OneToMany(type => TagTweet, tagTweet => tagTweet.tag)
    tagTweets: TagTweet[];

    @JoinColumn({ name: "created_user_id" })
    user: User;

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

    tweets: Tweet[]
}