import { Module } from '@nestjs/common';
import { PublicadorService } from './publicador.service';
import { PublicadorController } from './publicador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicadorRepository } from './publicador.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PublicadorRepository])],
  providers: [PublicadorService],
  controllers: [PublicadorController],
  exports: [TypeOrmModule.forFeature([PublicadorRepository])],
})
export class PublicadorModule {}
