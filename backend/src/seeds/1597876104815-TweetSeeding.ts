import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Tweet, Comment } from "@tiktok-clone/share/entities";
import * as _ from "lodash";
import { random } from "lodash";

const tweets: Partial<Tweet>[] = [];

for (let i = 1; i <= 30; i++) {
    tweets.push({
        user_id: 1,
        song_id: _.random(1, 3),
        video_id: _.random(101, 103),
        description: `Some title just like this ${_.random(0, 1000000)} <3`
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
                    user_id: 1,
                    tweet_id: t.id,
                    parent_id: null,
                    content: `Some awesome comment ${_.random(0, 1000000)} <3 <3`,
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
                    user_id: 1,
                    tweet_id: parentComment.tweet_id,
                    parent_id: parentComment.id,
                    content: `<3 Sub comment ${_.random(0, 1000000)} <3 <3`,
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
