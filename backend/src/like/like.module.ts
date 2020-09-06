import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { TweetModule } from 'src/tweet/tweet.module';
import { Like } from '@tiktok-clone/share/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TweetModule,
    TypeOrmModule.forFeature([Like])
  ],
  controllers: [LikeController],
  providers: [LikeService]
})
export class LikeModule { }
