import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CqrsModule } from '@nestjs/cqrs';
import { commandHandlers } from './commands';
import { queryHandlers } from './queries';

@Module({
  imports: [CqrsModule],
  controllers: [TaskController],
  providers: [TaskService, ...commandHandlers, ...queryHandlers],
})
export class TaskModule {}
