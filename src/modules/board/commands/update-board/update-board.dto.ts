import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateBoardDto {
  @ApiProperty({
    type: String,
    description: 'titulo do board',
    example: 'Tarefaas diárias',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(3, undefined, {
    message: 'O título deve ter pelo menos 3 caracteres.',
  })
  title?: string;

  @ApiProperty({
    type: String,
    description: 'Descrição da board',
    example: 'tarefas de rotineiras do dia a dia',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
