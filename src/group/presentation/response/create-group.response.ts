import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupResponse {
  @ApiProperty()
  groupId: string;

  @ApiProperty({
    example: 'http://localhost:8080/groups/invite/XXXX',
  })
  inviteUrl: string;
}
