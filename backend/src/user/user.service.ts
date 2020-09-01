import { Injectable } from '@nestjs/common';
import { User } from '@tiktok-clone/share/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly users: User[];
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
  }

  async findOne(phoneNumber: string, selectFields?): Promise<User | undefined> {
    return this.userRepository.findOne({where: { phone_number: phoneNumber }, select: selectFields});
  }
}