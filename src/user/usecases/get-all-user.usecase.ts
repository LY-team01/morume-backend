import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/user/domains/repository/user.repository.interface';
import { User } from '../domains/entities/user.entity';

@Injectable()
export class GetAllUserUsecase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
