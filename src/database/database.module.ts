/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entity/user.entity';
import { generateHash } from 'src/utils/generate-hash';
import { DataSource } from 'typeorm';

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
        entities: [User],
        synchronize: false,
        logging: false,
      }),
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    console.log('✅ Database connected');
    await this.checkAndSeedDatabase();
  }

  private async checkAndSeedDatabase() {
    const hasUserTable = await this.hasTable('user');

    if (!hasUserTable) {
      console.log('🔴 Creating tables');
      await this.dataSource.synchronize();
    } else {
      console.log('🔵 Tables already exist');
    }

    const existingUser = await this.dataSource.getRepository(User).findOne({
      where: { email: 'jmcsjoaomarcos@gmail.com' },
    });

    if (!existingUser) {
      console.log('🔴 No data found');
      const hash = await generateHash('jmcs');
      const user = this.dataSource.getRepository(User).create({
        name: 'João Marcos',
        email: 'jmcsjoaomarcos@gmail.com',
        password: hash,
      });

      await this.dataSource.getRepository(User).save(user);
      console.log('✅ Seed data inserted');
    } else {
      console.log('🔵 Data found');
    }
  }

  private async hasTable(tableName: string): Promise<boolean> {
    const query = `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = '${tableName}');`;
    const result = await this.dataSource.query(query);
    return result[0].exists;
  }
}
