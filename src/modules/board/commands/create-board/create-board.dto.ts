import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @Length(3, undefined, {
    message: 'O título deve ter pelo menos 3 caracteres.',
  })
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt({ message: 'O id do membro administrador é obrigatório' })
  memberAdminId: number;
}
