import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { queryHandlers } from './queries';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, ...queryHandlers],
})
export class UserModule {}
