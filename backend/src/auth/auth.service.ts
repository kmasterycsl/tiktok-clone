
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { User } from '@tiktok-clone/share/entities';

export interface IJwtTokenPayload { phoneNumber: string, userId: number }

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(phoneNumber: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(phoneNumber, ['id', 'password', 'phone_number']);
    if (!user) return null;
    const { password, ...result } = user;
    // Load hash from your password DB.
    if (bcrypt.compareSync(pass, user.password)) {
      return result;
    } else {
      return null;
    }
  }

  async login(user: User) {
    const payload: IJwtTokenPayload = { phoneNumber: user.phone_number, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}