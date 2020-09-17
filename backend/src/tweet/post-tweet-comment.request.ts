import { IsString, IsInt, IsOptional } from "class-validator";

export class PostTweetCommentRequest {
    @IsString()
    content: string;

    @IsOptional()
    @IsInt()
    parent_id?: number;
}