import { Module } from '@nestjs/common';
import { LocalizacaoService } from './localizacao.service';
import { LocalizacaoController } from './localizacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalizacaoRepository } from './localizacao.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LocalizacaoRepository])],
  providers: [LocalizacaoService],
  controllers: [LocalizacaoController],
  exports: [TypeOrmModule.forFeature([LocalizacaoRepository])],
})
export class LocalizacaoModule {}
