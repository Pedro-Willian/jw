import { Injectable } from '@nestjs/common';
import { CongregacaoRepository } from '~modules/congregacao/congregacao.repository';
import { LocalizacaoRepository } from '~modules/localizacao/localizacao.repository';
import { PublicadorRepository } from '~modules/publicador/publicador.repository';
import { CreateGrupoDto } from './dto/create-grupo-dto';
import { UpdateGrupoDto } from './dto/update-grupo-dto';
import { Grupo } from './grupo.entity';
import { GrupoRepository } from './grupo.repository';

@Injectable()
export class GrupoService {
  constructor(
    private grupoRepository: GrupoRepository,
    private localizacaoRepository: LocalizacaoRepository,
    private publicadorRepository: PublicadorRepository,
    private congregacaoRepository: CongregacaoRepository,
  ) {}

  private async grupoDtoToGrupo(grupoDto: CreateGrupoDto | UpdateGrupoDto) {
    const grupo = new Grupo();
    grupo.id = 'id' in grupoDto ? grupoDto.id : undefined;
    grupo.nome = grupoDto.nome;
    grupo.dia = grupoDto.dia;
    grupo.periodo = grupoDto.periodo;
    grupo.horario = grupoDto.horario;
    grupo.localizacao = await this.localizacaoRepository.findOneOrFail(
      grupoDto.localizacaoId,
    );
    grupo.dirigente = await this.publicadorRepository.findOneOrFail(
      grupoDto.dirigenteId,
    );
    grupo.ajudante = await this.publicadorRepository.findOneOrFail(
      grupoDto.ajudanteId,
    );
    grupo.congregacao = await this.congregacaoRepository.findOneOrFail(
      grupoDto.congregacaoId,
    );

    return grupo;
  }

  async list(congregacaoId: string) {
    const result = await this.grupoRepository.listGrupo(congregacaoId);
    return result;
  }

  async createGrupo(grupoDto: CreateGrupoDto) {
    const grupo = await this.grupoDtoToGrupo(grupoDto);
    const result = await this.grupoRepository.createGrupo(grupo);
    return result;
  }

  async updateGrupo(grupoDto: UpdateGrupoDto) {
    const grupo = await this.grupoDtoToGrupo(grupoDto);
    const result = await this.grupoRepository.updateGrupo(grupo);
    return result;
  }
}
