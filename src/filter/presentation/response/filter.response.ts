// src/filter/presentation/response/filter.response.ts
import { ApiProperty } from '@nestjs/swagger';

export class FilterResponse {
  @ApiProperty()
  userId: string;

  @ApiProperty({
    type: 'object',
    properties: {
      brightness: { type: 'number', minimum: 0, maximum: 100 },
      skin: { type: 'number', minimum: 0, maximum: 100 },
      contour: { type: 'number', minimum: 0, maximum: 100 },
      eye: { type: 'number', minimum: 0, maximum: 100 },
      nose: { type: 'number', minimum: 0, maximum: 100 },
      mouth: { type: 'number', minimum: 0, maximum: 100 },
    },
  })
  parameters: Record<string, number>;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
