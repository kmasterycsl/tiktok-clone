import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "src/entities/user.entity";

const users: Partial<User>[] = [
    {
        id: 1,
        name: 'Mr A',
        phone_number: '+84811111111',
        password: 'dummy',
        tweets: []
    },
    {
        id: 2,
        name: 'Ms B',
        phone_number: '+84822222222',
        password: 'dummy',
        tweets: []
    }
];

export class UserSeeding1597873658706 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await getRepository(User).save(
            users
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
