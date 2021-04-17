import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { Congregacao } from './congregacao/congregacao.entity';
import { CongregacaoModule } from './congregacao/congregacao.module';
import { Publicador } from './publicador/publicador.entity';
import { PublicadorModule } from './publicador/publicador.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT) || 5432,
      schema: process.env.DATABASE_SCHEMA || 'public',
      database: process.env.DATABASE_NAME || 'postgres',
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || '123',
      entities: [Publicador, Congregacao],
      synchronize: true,
    }),
    AuthModule,
    PublicadorModule,
    CongregacaoModule,
  ],
  controllers: [AppController],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppModule {}
