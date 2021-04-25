import { Module } from '@nestjs/common';
import { LocalizacaoService } from './localizacao.service';
import { LocalizacaoController } from './localizacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalizacaoRepository } from './localizacao.repository';
import { CongregacaoModule } from '~modules/congregacao/congregacao.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocalizacaoRepository]),
    CongregacaoModule,
  ],
  providers: [LocalizacaoService],
  controllers: [LocalizacaoController],
  exports: [TypeOrmModule.forFeature([LocalizacaoRepository])],
})
export class LocalizacaoModule {}
