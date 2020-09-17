import { IsString, IsInt, IsOptional } from "class-validator";

export class PostTweetRequest {
    @IsString()
    description: string;
}