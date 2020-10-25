import { MigrationInterface, QueryRunner, getRepository, getManager } from "typeorm";
import { Tweet, Comment, Tag } from "@tiktok-clone/share/entities";
import * as _ from "lodash";
import * as faker from "faker";
import { TagTweet } from "@tiktok-clone/share/entities/tag-tweet.entity";

const TOTAL_TAGS = 10;
const tags: Partial<Tag>[] = [];

for (let i = 1; i <= TOTAL_TAGS; i++) {
    tags.push({
        created_user_id: 1,
        slug:_.kebabCase(faker.finance.accountName()),
        description: faker.lorem.sentence(),
        total_likes: 0,
    });
}

export class TagSeeding1597876104825 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ts = await getRepository(Tag).save(
            tags
        );
        const tweetRepository = getRepository(Tweet).createQueryBuilder();
        const tagTweetRepository = getRepository(TagTweet);
        for (const tag of ts) {
            const randomTweets = await tweetRepository.orderBy('RAND()').limit(3).getMany();
            for (const tweet of randomTweets) {
                console.log(tweet.id);
                await tagTweetRepository.save({
                    tag_id: tag.id,
                    tweet_id: tweet.id,
                });
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 
    }

}
