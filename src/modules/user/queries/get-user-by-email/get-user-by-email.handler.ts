import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { GetUserByEmailDto } from './get-user-by-email.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';
import { plainToClass } from 'class-transformer';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery, GetUserByEmailDto | null>
{
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async execute(data: GetUserByEmailQuery): Promise<GetUserByEmailDto | null> {
    const user = await this.dataSource.manager.findOne(User, {
      where: {
        email: data.email,
      },
      select: ['id', 'name', 'email'],
    });

    if (!user) return null;

    return plainToClass(GetUserByEmailDto, user);
  }
}
