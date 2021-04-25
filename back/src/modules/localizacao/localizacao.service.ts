import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CongregacaoRepository } from '~modules/congregacao/congregacao.repository';
import { PgErrors } from '~utils/pg-errors';
import {
  CreateLocalizacaoDto,
  UpdateLocalizacaoDto,
} from './dto/localizacao.dto';
import { Localizacao } from './localizacao.entity';
import { LocalizacaoRepository } from './localizacao.repository';

@Injectable()
export class LocalizacaoService {
  constructor(
    private localizacaoRepository: LocalizacaoRepository,
    private congregacaoRepository: CongregacaoRepository,
  ) {}

  private async localizacaoDtoToLocalizacao(
    localizacaoDto: CreateLocalizacaoDto | UpdateLocalizacaoDto,
  ) {
    const localizacao = new Localizacao();
    localizacao.id = 'id' in localizacaoDto ? localizacaoDto.id : undefined;
    localizacao.nome = localizacaoDto.nome;
    localizacao.endereco = localizacaoDto.endereco;
    localizacao.congregacao = await this.congregacaoRepository.findOneOrFail(
      localizacaoDto.congregacaoId,
    );

    return localizacao;
  }

  async list(congregacaoId: string) {
    const result = await this.localizacaoRepository.listLocalizacao(
      congregacaoId,
    );
    return result;
  }

  async createLocalizacao(localizacaoDto: CreateLocalizacaoDto) {
    const localizacao = await this.localizacaoDtoToLocalizacao(localizacaoDto);
    const result = await this.localizacaoRepository.createLocalizacao(
      localizacao,
    );
    return result;
  }

  async updateLocalizacao(localizacaoDto: UpdateLocalizacaoDto) {
    const localizacao = await this.localizacaoDtoToLocalizacao(localizacaoDto);
    const result = await this.localizacaoRepository.updateLocalizacao(
      localizacao,
    );
    return result;
  }

  async deleteLocalizacao(localizacaoId: string, congregacaoId: string) {
    try {
      return await this.localizacaoRepository.deleteLocalizacao(
        localizacaoId,
        congregacaoId,
      );
    } catch (error) {
      if (error.code === PgErrors.foreignKeyViolation)
        throw new HttpException(
          'A localização está em uso, não é possível excluir',
          HttpStatus.BAD_REQUEST,
        );
      throw new HttpException('Erro não previsto', HttpStatus.BAD_REQUEST);
    }
  }
}
