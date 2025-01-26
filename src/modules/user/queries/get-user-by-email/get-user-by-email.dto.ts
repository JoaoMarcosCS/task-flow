import { ApiProperty } from '@nestjs/swagger';

export class GetUserByEmailDto {
  @ApiProperty({ description: 'ID do usuário', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nome do usuário', example: 'João Silva' })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@email.com',
  })
  email: string;
}
