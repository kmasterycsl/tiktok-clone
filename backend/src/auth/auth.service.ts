
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(phoneNumber: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(phoneNumber);
    if (!user) return null;
    const { password, ...result } = user;
    // Load hash from your password DB.
    if (bcrypt.compareSync(pass, user.password)) {
      return result;
    } else {
      return null;
    }
  }

  async login(user: any) {
    const payload = { phoneNumber: user.phone_number, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}