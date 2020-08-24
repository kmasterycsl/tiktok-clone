import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Tweet } from "src/entities/tweet.entity";

const tweets: Partial<Tweet>[] = [
    {
        id: 1,
        user_id: 1,
        song_id: 1,
        video_id: 101,
        description: 'Something just like this',
    },
    {
        id: 2,
        user_id: 1,
        song_id: 2,
        video_id: 102,
        description: 'Why you look at me',
    },
    {
        id: 3,
        user_id: 1,
        song_id: 3,
        video_id: 103,
        description: 'Shadow night',
    }
]

export class TweetSeeding1597876104815 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await getRepository(Tweet).save(
            tweets
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
