import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './commands/create-user/create-user.dto';
import { AuthJwtGuard } from '../auth/guard/auth-jwt.guard';
import { UpdateUserDto } from './commands/update-user/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body()
    data: CreateUserDto,
  ) {
    return await this.userService.create(data);
  }

  @Patch()
  @UseGuards(AuthJwtGuard)
  async update(
    @Body()
    body: UpdateUserDto,
  ) {
    return await this.userService.update(body);
  }

  @Get('get-by-id/:id')
  @UseGuards(AuthJwtGuard)
  async getUserById(
    @Param()
    id: number,
  ) {
    return await this.userService.getUserById(id);
  }

  @Get('get-by-email/:email')
  @UseGuards(AuthJwtGuard)
  async getUserByEmail(
    @Param()
    email: string,
  ) {
    return await this.userService.getUserByEmail(email);
  }

  @Delete(':id')
  @UseGuards(AuthJwtGuard)
  async delete(
    @Param()
    id: number,
  ) {
    return await this.userService.delete(id);
  }
}
