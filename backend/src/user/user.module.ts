import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@tiktok-clone/share/entities';

@Module({
    providers: [UserService],
    exports: [UserService],
    imports: [
        TypeOrmModule.forFeature([User]),
    ]
})
export class UserModule { }
