// src/filter/filter.module.ts
import { Module } from '@nestjs/common';
import { FilterController } from './presentation/filter.controller';
import { GetFilterByUserIdUseCase } from './usecases/fetch-filter.usecase';
import { FilterRepository } from './infrastructure/filter.repository.impl';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FilterController],
  providers: [
    GetFilterByUserIdUseCase,
    {
      provide: 'FilterRepository',
      useClass: FilterRepository,
    },
  ],
})
export class FilterModule {}
