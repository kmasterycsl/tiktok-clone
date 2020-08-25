import { CommonEntity } from './common.entity';
import { User } from './user.entity';
export declare class Asset extends CommonEntity {
    constructor();
    id: number;
    user_id: number;
    title: string;
    file_mime: string;
    file_name: string;
    file_extension: string;
    file_relative_path: string;
    user: User;
    associated_objects: any[];
    file_url: string;
    setExtraInfo(): void;
}
