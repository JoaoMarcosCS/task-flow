import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Título da tarefa',
    example: 'Finalizar relatório do projeto',
  })
  @IsNotEmpty({ message: 'O título é obrigatório.' })
  @IsString({ message: 'O título deve ser uma string.' })
  @MinLength(3, { message: 'O título deve ter pelo menos 3 caracteres.' })
  title: string;

  @ApiProperty({
    description: 'Descrição da tarefa',
    example: 'Criar o relatório com base nos dados fornecidos pelo cliente.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string.' })
  description?: string;

  @ApiProperty({
    description: 'ID do quadro ao qual a tarefa pertence',
    example: 1,
  })
  @IsNotEmpty({ message: 'O ID do quadro é obrigatório.' })
  @IsNumber({}, { message: 'O ID do quadro deve ser um número.' })
  boardId: number;

  @ApiProperty({
    description: 'ID da prioridade atribuída à tarefa',
    example: 2,
  })
  @IsNotEmpty({ message: 'O ID da prioridade é obrigatório.' })
  @IsNumber({}, { message: 'O ID da prioridade deve ser um número.' })
  priorityId: number;
}
