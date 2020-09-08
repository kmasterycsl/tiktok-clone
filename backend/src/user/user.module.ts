import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Like } from '@tiktok-clone/share/entities';
import { UserController } from './user.controller';
import { TweetModule } from 'src/tweet/tweet.module';

@Module({
    providers: [UserService],
    exports: [UserService],
    imports: [
        TweetModule,
        TypeOrmModule.forFeature([User, Like]),
    ],
    controllers: [UserController]
})
export class UserModule { }
