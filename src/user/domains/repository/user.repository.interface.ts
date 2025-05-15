import { User } from '../entities/user.entity';

export interface IUserRepository {
  getAll(): Promise<User[]>;
}
