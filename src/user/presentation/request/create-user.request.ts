import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { z } from 'zod';
export class CreateUserRequest {
  @ApiProperty({
    description: 'ニックネーム',
    example: 'Hinata',
  })
  nickname: string;

  @ApiPropertyOptional({
    description: 'アバターURL',
    example: 'https://example.com/avatar.png',
  })
  avatarUrl?: string | null;

  @ApiProperty({
    description: 'フィルターパラメータ',
    example: {
      brightness: 25,
      skin: 50,
      contour: 75,
      eye: 100,
      nose: 100,
      mouth: 80,
    },
    required: false,
  })
  filter: Record<string, any>;
}

export const createUserValidationSchema = z
  .object({
    nickname: z.string().min(1, 'ニックネームは必須です'),
    avatarUrl: z.string().url().optional().nullable(),
    filter: z
      .object({
        brightness: z.number().min(-100).max(100).optional(),
        skin: z.number().min(-100).max(100).optional(),
        contour: z.number().min(-100).max(100).optional(),
        eye: z.number().min(-100).max(100).optional(),
        nose: z.number().min(-100).max(100).optional(),
        mouth: z.number().min(-100).max(100).optional(),
      })
      .default({}),
  })
  .strict();
