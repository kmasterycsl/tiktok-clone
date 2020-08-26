import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Tweet } from "@tiktok-clone/share/entities";
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
        await getRepository(Tweet).save(
            tweets
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
