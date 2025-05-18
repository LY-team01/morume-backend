// src/filter/usecases/get-filter-by-user-id.usecase.ts
import { Injectable, Inject } from '@nestjs/common';
import { FilterEntity } from '../domains/entities/filter.entity';
import { IFilterRepository } from '../domains/repository/filter.repository.interface';

@Injectable()
export class GetFilterByUserIdUseCase {
  constructor(
    @Inject('FilterRepository')
    private readonly filterRepository: IFilterRepository,
  ) {}

  async execute(userId: string): Promise<FilterEntity | null> {
    return this.filterRepository.findByUserId(userId);
  }
}
