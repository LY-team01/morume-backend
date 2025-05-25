import { ApiProperty } from '@nestjs/swagger';

export class GroupResponse {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: [String] })
  userIds: string[];

  @ApiProperty()
  createdAt: Date;
}
