import { User } from '../entities/user.entity';

export interface IUserRepository {
  findAll(): Promise<User[]>;
}
