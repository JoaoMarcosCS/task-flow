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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(
    @Body()
    data: CreateUserDto,
  ) {
    return await this.userService.create(data);
  }

  @Patch()
  async update(
    @Body()
    body: UpdateUserDto,
  ) {
    return await this.userService.update(body);
  }

  @Get('get-by-id/:id')
  async getUserById(
    @Param()
    id: number,
  ) {
    return await this.userService.getUserById(id);
  }

  @Get('get-by-email/:email')
  async getUserByEmail(
    @Param()
    email: string,
  ) {
    return await this.userService.getUserByEmail(email);
  }

  @Delete(':id')
  async delete(
    @Param()
    id: number,
  ) {
    return await this.userService.delete(id);
  }
}
