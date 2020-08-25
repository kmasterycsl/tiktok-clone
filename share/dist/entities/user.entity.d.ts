import { CommonEntity } from './common.entity';
import { Tweet } from './tweet.entity';
export declare class User extends CommonEntity {
    id: number;
    name: string;
    password: string;
    phone_number: string;
    tweets: Tweet[];
    assets: Tweet[];
}
