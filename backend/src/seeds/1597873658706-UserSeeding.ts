import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "@simple-tiktok/share/entities";
import * as faker from "faker";

export const TOTAL_USERS = 500;
const users: Partial<User>[] = [];

for (let i = 1; i <= TOTAL_USERS; i++) {
    users.push({
        id: i,
        name: faker.name.findName(),
        phone_number: faker.phone.phoneNumber(),
        password: '$2b$04$k3PucSCz1Ij2NWLIzxQGF.HjDeZG6FyRhUAara2zjuPkU8FQ0vWnu', // 123456
        tweets: [],
        total_followings: 0,
        total_followers: 0,
        is_liked: false,
        total_received_tweet_likes: 0,
    })
}

export class UserSeeding1597873658706 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await getRepository(User).save(
            users
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
