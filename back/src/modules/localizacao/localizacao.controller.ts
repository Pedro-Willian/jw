import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '~auth/permissao.guard';
import { NomePermissao, Permissao } from '~enum/permissao';
import { CongregacaoQueryString } from '~modules/congregacao/dto/congregacao-query.dto';
import {
  CreateLocalizacaoDto,
  UpdateLocalizacaoDto,
  QueryStringLocalizacaoDto,
} from '~modules/localizacao/dto/localizacao.dto';
import { LocalizacaoService } from './localizacao.service';

@Controller('localizacao')
export class LocalizacaoController {
  constructor(private localizacaoService: LocalizacaoService) {}

  @Get()
  @Roles([
    {
      nomePermissao: NomePermissao.grupos,
      permissao: Permissao.VISUALIZACAO,
    },
    {
      nomePermissao: NomePermissao.grupos,
      permissao: Permissao.EDICAO,
    },
  ])
  async listLocalizacao(@Query() query: CongregacaoQueryString) {
    return this.localizacaoService.list(query.congregacaoId);
  }

  @Post()
  @Roles({
    nomePermissao: NomePermissao.grupos,
    permissao: Permissao.EDICAO,
  })
  async createLocalizacao(
    @Body(ValidationPipe) createLocalizacaoDto: CreateLocalizacaoDto,
  ) {
    const { id } = await this.localizacaoService.createLocalizacao(
      createLocalizacaoDto,
    );
    return { id };
  }

  @Put()
  @Roles({
    nomePermissao: NomePermissao.grupos,
    permissao: Permissao.EDICAO,
  })
  async updateLocalizacao(
    @Body(ValidationPipe) updateLocalizacaoDto: UpdateLocalizacaoDto,
  ) {
    const { id } = await this.localizacaoService.updateLocalizacao(
      updateLocalizacaoDto,
    );
    return { id };
  }

  @Delete()
  @Roles({
    nomePermissao: NomePermissao.grupos,
    permissao: Permissao.EDICAO,
  })
  async deleteLocalizacao(
    @Query()
    query: QueryStringLocalizacaoDto,
  ) {
    return await this.localizacaoService.deleteLocalizacao(
      query.localizacaoId,
      query.congregacaoId,
    );
  }
}
