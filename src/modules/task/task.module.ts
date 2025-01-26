import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CqrsModule } from '@nestjs/cqrs';
import { commandHandlers } from '../user/commands';

@Module({
  imports: [CqrsModule],
  controllers: [TaskController],
  providers: [TaskService, ...commandHandlers],
})
export class TaskModule {}
