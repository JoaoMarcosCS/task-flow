import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '../create-user/create-user.dto';
import {
  IsOptional,
  IsEmail,
  IsString,
  Length,
  IsNumber,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    type: Number,
    description: 'user id',
    example: '123',
    required: true,
  })
  @IsNumber({}, { message: 'Informe um id numerico válido' })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Email of the user (optional)',
    example: 'jmcsjoaomarcos@gmail.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Informe um email válido' })
  email?: string;

  @ApiProperty({
    type: String,
    description: 'User password (optional)',
    example: 'jmcs',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(4, undefined, {
    message: 'A senha deve ter pelo menos 4 caracteres.',
  })
  password?: string;

  @ApiProperty({
    type: String,
    description: 'User name (optional)',
    example: 'João Marcos',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Informe o seu nome' })
  @Length(3, undefined, {
    message: 'O seu nome deve ter pelo menos 3 caracteres.',
  })
  name?: string;
}
