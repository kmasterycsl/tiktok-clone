import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Tweet, Comment } from "@tiktok-clone/share/entities";
import * as _ from "lodash";
import { TOTAL_USERS } from "./1597873658706-UserSeeding";
import * as faker from "faker";

const TOTAL_TWEETS = 500;
const tweets: Partial<Tweet>[] = [];

for (let i = 1; i <= TOTAL_TWEETS; i++) {
    tweets.push({
        user_id: _.random(1, TOTAL_USERS),
        song_id: _.random(1, 3),
        comments_count: 0,
        video_id: _.random(101, 103),
        description: faker.lorem.sentence(),
    });
}

export class TweetSeeding1597876104815 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ts = await getRepository(Tweet).save(
            tweets
        );

        // seed root comments
        let comments: Partial<Comment>[] = [];
        for (const t of ts) {
            const totalComments = _.random(1, 30);
            for (let j = 1; j <= totalComments; j++) {
                comments.push({
                    user_id: _.random(1, TOTAL_USERS),
                    tweet_id: t.id,
                    parent_id: null,
                    children_count: 0,
                    content: faker.lorem.sentence(),
                });
            }
            comments = await getRepository(Comment).save(
                comments
            );
        }

        const subComments = [];
        for (const parentComment of comments) {
            const totalComments = _.random(1, 30);
            for (let j = 1; j <= totalComments; j++) {
                subComments.push({
                    user_id: _.random(1, TOTAL_USERS),
                    tweet_id: parentComment.tweet_id,
                    parent_id: parentComment.id,
                    children_count: 0,
                    content: faker.lorem.sentence(),
                });
            }
        }
        await getRepository(Comment).save(
            subComments
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 
    }

}
