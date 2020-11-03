import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { TweetModule } from 'src/tweet/tweet.module';
import { Like } from '@simple-tiktok/share/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TweetModule,
    TypeOrmModule.forFeature([Like]),
    UserModule,
  ],
  controllers: [LikeController],
  providers: [LikeService]
})
export class LikeModule { }
