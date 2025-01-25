/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/modules/board/entities/board.entity';
import { BoardUserRole } from 'src/modules/board/entities/board_user_role.entity';
import { Role } from 'src/modules/board/entities/role.entity';
import { Priority } from 'src/modules/task/entities/priority.entity';
import { Status } from 'src/modules/task/entities/status.entity';
import { Task } from 'src/modules/task/entities/task.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { seed } from './seed/seed';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [User, Role, Priority, Board, Task, Status, BoardUserRole],
        synchronize: true,
        logging: false,
      }),
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    console.log('✅ Database connected');
    await this.resetAndSeedDatabase();
  }

  private async resetAndSeedDatabase() {
    console.log('⚠️ Cleaning tables');
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();
      const tables = await this.getAllTables();

      for (const table of tables) {
        //trucade elimina os registros da tabela
        await queryRunner.query(`TRUNCATE TABLE "${table}" CASCADE;`);
      }

      await queryRunner.commitTransaction();
      console.log('✅ All tables cleaned');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('❌ Error resetting database:', error);
    } finally {
      await queryRunner.release();
    }

    console.log('Starting seed ');
    await seed(this.dataSource);
    console.log('Finished seed');
  }

  private async getAllTables(): Promise<string[]> {
    const tables = await this.dataSource.query(
      `SELECT tablename FROM pg_tables WHERE schemaname = 'public';`,
    );
    return tables.map((row: { tablename: string }) => row.tablename);
  }
}
