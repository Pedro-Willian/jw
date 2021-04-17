import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { Congregacao } from '~modules/congregacao/congregacao.entity';
import { CongregacaoModule } from '~modules/congregacao/congregacao.module';
import { Publicador } from '~modules/publicador/publicador.entity';
import { PublicadorModule } from '~modules/publicador/publicador.module';
import { LocalizacaoModule } from '~modules/localizacao/localizacao.module';
import { GrupoModule } from '~modules/grupo/grupo.module';
import { Localizacao } from '~modules/localizacao/localizacao.entity';
import { Grupo } from '~modules/grupo/grupo.entity';

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
      entities: [Publicador, Congregacao, Localizacao, Grupo],
      synchronize: true,
    }),
    AuthModule,
    PublicadorModule,
    CongregacaoModule,
    LocalizacaoModule,
    GrupoModule,
  ],
  controllers: [AppController],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppModule {}
