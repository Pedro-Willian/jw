import { Module } from '@nestjs/common';
import { CongregacaoService } from './congregacao.service';
import { CongregacaoController } from './congregacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CongregacaoRepository } from './congregacao.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CongregacaoRepository])],
  providers: [CongregacaoService],
  controllers: [CongregacaoController],
  exports: [TypeOrmModule.forFeature([CongregacaoRepository])],
})
export class CongregacaoModule {}
