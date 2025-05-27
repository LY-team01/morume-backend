import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupResponse {
  @ApiProperty()
  groupId: string;

  @ApiProperty({
    example: 'http://localhost:8080/invite/XXXX',
  })
  inviteUrl: string;
}
