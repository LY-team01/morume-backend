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
}

export const createUserValidationSchema = z
  .object({
    nickname: z.string().min(1, 'ニックネームは必須です'),
    avatarUrl: z.string().url().optional().nullable(),
  })
  .strict();
