import { FilterEntity } from '../entities/filter.entity';

export interface IFilterRepository {
  findByUserId(userId: string): Promise<FilterEntity | null>;
  create(filter: FilterEntity): Promise<FilterEntity>;
  update(
    userId: string,
    parameters: FilterEntity['parameters'],
  ): Promise<FilterEntity>;
}
