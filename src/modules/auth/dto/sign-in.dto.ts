import { IsEmail, IsString, Length } from 'class-validator';

export class SignInDto {
  @IsEmail({}, { message: 'Informe um email válido' })
  email: string;

  @IsString()
  @Length(4, undefined, {
    message: 'A senha deve ter pelo menos 4 caracteres.',
  })
  password: string;
}
