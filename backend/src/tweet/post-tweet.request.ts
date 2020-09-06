import { IsString, IsInt, IsOptional } from "class-validator";

export class PostTweetRequest {
    @IsString()
    content: string;

    @IsOptional()
    @IsInt()
    parent_id?: number;
}