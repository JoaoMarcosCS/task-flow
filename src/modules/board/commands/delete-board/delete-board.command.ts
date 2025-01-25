import { ApiProperty } from '@nestjs/swagger';

export class DeleteBoardCommand {
  @ApiProperty({
    type: Number,
    description: 'Board id',
    example: '1234',
    required: true,
  })
  id: number;
}
