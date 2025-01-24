import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { string } from 'joi';

export class SignInDto {
  @ApiProperty({
    type: string,
    description: 'Email of the user',
    example: 'jmcsjoaomarcos@gmail.com',
  })
  @IsEmail({}, { message: 'Informe um email válido' })
  email: string;

  @ApiProperty({
    type: string,
    description: 'User password',
    example: 'jmcs',
  })
  @IsString()
  @Length(4, undefined, {
    message: 'A senha deve ter pelo menos 4 caracteres.',
  })
  password: string;
}
