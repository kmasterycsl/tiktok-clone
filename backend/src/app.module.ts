import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TweetModule } from './tweet/tweet.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { LikeModule } from './like/like.module';
import { AssetModule } from './asset/asset.module';

@Module({
  imports: [
    ConfigModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveStaticOptions: {
        index: false,
      },
    }),
    TypeOrmModule.forRoot({
    }),
    UserModule,
    TweetModule,
    AuthModule,
    LikeModule,
    AssetModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
