import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from 'src/entities/tweet.entity';

@Module({
  controllers: [TweetController],
  providers: [TweetService],
  imports: [
    TypeOrmModule.forFeature([Tweet])
  ]
})
export class TweetModule { }
