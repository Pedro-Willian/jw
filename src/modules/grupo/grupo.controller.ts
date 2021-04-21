import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '~auth/jwt-auth.guard';
import { Roles, RolesGuard } from '~auth/permissao.guard';
import { NomePermissao, Permissao } from '~enum/permissao';
import { CongregacaoQuerystring } from '~src/dto/congregacao-query.dto';
import { CreateGrupoDto } from './dto/create-grupo-dto';
import { UpdateGrupoDto } from './dto/update-grupo-dto';
import { GrupoService } from './grupo.service';

@Controller('grupo')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GrupoController {
  constructor(private grupoService: GrupoService) {}

  @Post()
  @Roles({
    nomePermissao: NomePermissao.gruposFamilias,
    permissao: Permissao.EDICAO,
  })
  async createGrupo(@Body(ValidationPipe) createGrupoDto: CreateGrupoDto) {
    const { id } = await this.grupoService.createGrupo(createGrupoDto);
    return { id };
  }

  @Put()
  @Roles({
    nomePermissao: NomePermissao.gruposFamilias,
    permissao: Permissao.EDICAO,
  })
  async updateGrupo(@Body(ValidationPipe) updateGrupoDto: UpdateGrupoDto) {
    const { id } = await this.grupoService.updateGrupo(updateGrupoDto);
    return { id };
  }

  @Get()
  @Roles([
    {
      nomePermissao: NomePermissao.gruposFamilias,
      permissao: Permissao.VISUALIZACAO,
    },
    {
      nomePermissao: NomePermissao.gruposFamilias,
      permissao: Permissao.EDICAO,
    },
  ])
  async listGrupo(@Query() query: CongregacaoQuerystring) {
    return this.grupoService.list(query.congregacaoId);
  }
}
