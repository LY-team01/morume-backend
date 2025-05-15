import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/user/domains/repository/user.repository.interface';
import { UserEntity } from '../domains/entities/user.entity';

@Injectable()
export class GetAllUserUsecase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<UserEntity[]> {
    return await this.userRepository.getAll();
  }
}
