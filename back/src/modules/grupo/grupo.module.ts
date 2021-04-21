import { Module } from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { GrupoController } from './grupo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoRepository } from './grupo.repository';
import { LocalizacaoModule } from '~modules/localizacao/localizacao.module';
import { PublicadorModule } from '~modules/publicador/publicador.module';
import { CongregacaoModule } from '~modules/congregacao/congregacao.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GrupoRepository]),
    LocalizacaoModule,
    PublicadorModule,
    CongregacaoModule,
  ],
  providers: [GrupoService],
  controllers: [GrupoController],
  exports: [TypeOrmModule.forFeature([GrupoRepository])],
})
export class GrupoModule {}
