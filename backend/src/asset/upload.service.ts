  
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { User } from '@tiktok-clone/share/entities';

@Injectable()
export class UploadService {
  constructor(
    
  ) { }

  upload(file: File) {
    console.log(file);
  }

}
