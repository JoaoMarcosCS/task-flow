import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './commands/create-user/create-user.dto';
import { AuthJwtGuard } from '../auth/guard/auth-jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthJwtGuard)
  async create(
    @Body()
    data: CreateUserDto,
  ) {
    return await this.userService.create(data);
  }
}
