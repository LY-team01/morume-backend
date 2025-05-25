// src/group/group.module.ts
import { Module } from '@nestjs/common';
import { GroupController } from './presentation/group.controller';
import { CreateGroupUseCase } from './usecases/create-group.usecase';
import { InviteUserUseCase } from './usecases/invite-user.usecase';
import { GetGroupByUserIdUseCase } from './usecases/get-group-by-user-id.usecase';
import { GroupRepository } from './infrastructure/group.repository.impl';
import { PrismaModule } from '../../prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [GroupController],
  providers: [
    CreateGroupUseCase,
    InviteUserUseCase,
    GetGroupByUserIdUseCase,
    {
      provide: 'GroupRepository',
      useClass: GroupRepository,
    },
  ],
})
export class GroupModule {}
