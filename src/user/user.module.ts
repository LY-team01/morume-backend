import { Module } from '@nestjs/common';
import { UserRepository } from 'src/user/infrastructure/user.repository.impl';
import { UserController } from 'src/user/presentation/user.controller';
import { GetAllUserUsecase } from './usecases/get-all-user.usecase';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    GetAllUserUsecase,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
