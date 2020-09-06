import { IsString, IsEnum, IsNumber, IsInt } from 'class-validator';
import { LikableType } from './consts';

export class LikeRequest {
    @IsInt()
    likableId: number;

    @IsEnum(LikableType)
    likableType: string;
}