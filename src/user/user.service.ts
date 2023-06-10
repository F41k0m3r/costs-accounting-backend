import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UsersDocument>,
  ) {}

  async findOneByUsername(username: string): Promise<User> {
    return this.usersModel.findOne({ username: username });
  }
  async findOneById(id: string): Promise<User> {
    return this.usersModel.findOne({ _id: id });
  }

  async validateUser(username: string): Promise<User | null> {
    const user = await this.findOneByUsername(username);

    if (!user) {
      return null;
    }

    return user;
  }
}
