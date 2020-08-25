import { CommonEntity } from './common.entity';
import { User } from './user.entity';
import { Asset } from './asset.entity';
export declare class Tweet extends CommonEntity {
    id: number;
    user_id: number;
    song_id: number;
    video_id: number;
    description: string;
    user: User;
    song: Asset;
    video: Asset;
}
