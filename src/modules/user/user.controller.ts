import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './commands/create-user/create-user.dto';
import { UpdateUserDto } from './commands/update-user/update-user.dto';
import { Public } from '../auth/decorator/public-route.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { boolean } from 'joi';
import { GetUserByEmailDto } from './queries/get-user-by-email/get-user-by-email.dto';
import { GetUserByIdDto } from './queries/get-user-by-id/get-user-by-id.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiBody({ type: CreateUserDto })
  async create(
    @Body()
    data: CreateUserDto,
  ) {
    return await this.userService.create(data);
  }

  @Patch()
  @ApiOperation({ summary: 'Atualiza informações de um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso.',
    type: boolean,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.', type: boolean })
  @ApiBody({ type: UpdateUserDto })
  async update(
    @Body()
    body: UpdateUserDto,
  ) {
    return await this.userService.update(body);
  }

  @Get('get-by-id/:id')
  @ApiOperation({ summary: 'Busca um usuário pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado.',
    type: GetUserByIdDto,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
  async getUserById(
    @Param('id')
    id: number,
  ) {
    return await this.userService.getUserById(id);
  }

  @Get('get-by-email/:email')
  @ApiOperation({ summary: 'Busca um usuário pelo email' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado.',
    type: GetUserByEmailDto,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiParam({ name: 'email', type: String, description: 'Email do usuário' })
  async getUserByEmail(
    @Param('email')
    email: string,
  ) {
    return await this.userService.getUserByEmail(email);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui um usuário pelo ID' })
  @ApiResponse({ status: 200, description: 'Usuário excluído com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
  async delete(
    @Param('id')
    id: number,
  ) {
    return await this.userService.delete(id);
  }
}
