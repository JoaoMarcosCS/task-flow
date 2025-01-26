import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { queryHandlers } from './queries';
import { commandHandlers } from './commands';

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [UserService, ...queryHandlers, ...commandHandlers],
})
export class UserModule {}
