import { Model } from 'mongoose';
import { User, UsersDocument } from './user.schema';
export declare class UserService {
    private usersModel;
    constructor(usersModel: Model<UsersDocument>);
    findOneByUsername(username: string): Promise<User>;
    findOneById(id: string): Promise<User>;
    validateUser(username: string): Promise<User | null>;
}
