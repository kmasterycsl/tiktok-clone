import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Tweet, Comment } from "@tiktok-clone/share/entities";
import * as _ from "lodash";

const tweets: Partial<Tweet>[] = [];

for (let i = 1; i <= 100; i++) {
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
        for (const t of ts) {
            const comments: Partial<Comment>[] = [];
            const totalComments = _.random(1, 100);
            for (let j = 1; j <= totalComments; j++) {
                const parentId = _.random(-30, j);
                comments.push({
                    user_id: 1,
                    tweet_id: t.id,
                    parent_id: parentId <= 0 ? null : parentId,
                    content: `Some awesome comment ${_.random(0, 1000000)} <3 <3`,
                });
            }
            await getRepository(Comment).save(
                comments
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 
    }

}
