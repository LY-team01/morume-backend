import { Controller, Get, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { GetFilterByUserIdUseCase } from '../usecases/fetch-filter.usecase';
import { FilterResponse } from './response/filter.response';
import { ApiBearerAuth, ApiOperation, ApiResponse} from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/shared/fireabase-auth.guard';

@Controller('filter')
export class FilterController {
  constructor(
    private readonly getFilterByUserIdUseCase: GetFilterByUserIdUseCase,
  ) {}

  @Get(':userId')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth('firebase-token')
  @ApiOperation({ summary: 'フィルター取得' })
  @ApiResponse({
    status: 200,
    description: 'フィルター取得成功',
    type: FilterResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'フィルターが見つかりません',
  })
  async getFilter(@Param('userId') userId: string) {
    const filter = await this.getFilterByUserIdUseCase.execute(userId);

    if (!filter) {
      throw new NotFoundException('Filter not found');
    }

    return filter;
  }
}