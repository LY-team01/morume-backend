// src/group/group.module.ts
import { Module } from '@nestjs/common';
import { GroupController } from './presentation/group.controller';
import { CreateGroupUseCase } from './usecases/create-group.usecase';
import { JoinUserUseCase } from './usecases/join-user.usecase';
import { GetGroupByUserIdUseCase } from './usecases/get-group-by-user-id.usecase';
import { GroupRepository } from './infrastructure/group.repository.impl';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/infrastructure/user.repository.impl';
@Module({
  imports: [PrismaModule, UserModule],
  controllers: [GroupController],
  providers: [
    CreateGroupUseCase,
    JoinUserUseCase,
    GetGroupByUserIdUseCase,
    {
      provide: 'GroupRepository',
      useClass: GroupRepository,
    },
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
})
export class GroupModule {}
