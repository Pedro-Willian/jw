import { Module } from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { GrupoController } from './grupo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoRepository } from './grupo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GrupoRepository])],
  providers: [GrupoService],
  controllers: [GrupoController],
  exports: [TypeOrmModule.forFeature([GrupoRepository])],
})
export class GrupoModule {}
