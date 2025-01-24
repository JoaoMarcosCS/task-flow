import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { GetUserByEmailDto } from './get-user-by-email.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../../entity/user.entity';
import { plainToClass } from 'class-transformer';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery, GetUserByEmailDto | null>
{
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async execute(query: GetUserByEmailQuery): Promise<GetUserByEmailDto | null> {
    const user = await this.dataSource.manager.find(User, {
      where: {
        email: query.email,
      },
    });

    if (!user.length) return null;

    return plainToClass(GetUserByEmailDto, user[0]);
  }
}
