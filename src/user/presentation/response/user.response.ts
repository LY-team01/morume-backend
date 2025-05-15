import { ApiProperty } from '@nestjs/swagger';

// `User` インターフェースをクラスに変換
export class UserResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  studentId: string;

  @ApiProperty({ nullable: true })
  lineId?: string | null;

  @ApiProperty()
  created_at: string;

  @ApiProperty({ nullable: true })
  deleted_at?: string | null;
}
