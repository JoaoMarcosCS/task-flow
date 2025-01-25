import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';
import { GetUserByEmailDto } from '../get-user-by-email/get-user-by-email.dto';
import { GetUserByIdDto } from './get-user-by-id.dto';
import { GetUserByIdQuery } from './get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler
  implements IQueryHandler<GetUserByIdQuery, GetUserByIdDto | null>
{
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async execute(data: GetUserByIdQuery): Promise<GetUserByIdDto | null> {
    const user = await this.dataSource.manager.findOne(User, {
      where: {
        id: data.id,
      },
      select: ['id', 'name', 'email'],
    });

    if (!user) return null;

    return plainToClass(GetUserByEmailDto, user);
  }
}
