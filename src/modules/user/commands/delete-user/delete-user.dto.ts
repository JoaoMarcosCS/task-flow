import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDto {
  @ApiProperty({
    type: Number,
    description: 'User id',
    example: '1234',
    required: true,
  })
  id: number;
}
