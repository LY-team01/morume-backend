import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty({ nullable: true })
  avatarUrl: string | null;

  @ApiProperty({
    description: 'フィルターパラメータ',
    example: {
      brigthness: 25,
      skin: 50,
      contour: 75,
      eye: 100,
      nose: 100,
      mouth: 80,
    },
    required: false,
  })
  filter: Record<string, any>;

  @ApiProperty({
    description: '顔特徴量の数値配列',
    example: [1, 2, 3],
    type: [Number],
    nullable: true,
  })
  features: number[] | null;

  @ApiProperty()
  createdAt: string;

  @ApiProperty({ nullable: true })
  updatedAt: string | null;
}
