import { TweetStatus } from "@simple-tiktok/share";
import { IsString, IsInt, IsOptional, IsEnum } from "class-validator";

export class PostTweetRequest {
    @IsString()
    description: string;

    @IsEnum(TweetStatus)
    status: TweetStatus;
}