import { IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { Periodo } from '~enum/periodo';
import { Semana } from '~enum/semana';
import { CongregacaoQueryString } from '~src/dto/congregacao-query.dto';
import { CongregacaoIdValidate } from '~utils/congregacao-id.validate';
import { IfExistsValidate } from '~utils/if-exists.validate';
import { UuidValidate } from '~utils/uuid.validate';

export class CreateGrupoDto {
  @IsNotEmpty({
    message: 'Informe um nome',
  })
  nome: string;

  @IsEnum(Semana, {
    message: 'Informe um dia válido',
  })
  dia: Semana;

  @IsEnum(Periodo, {
    message: 'Informe um período válido',
  })
  periodo: Periodo;

  @IsNotEmpty({
    message: 'Informe um horário',
  })
  @Matches(/^(([0-1][0-9])|[2][0-3]):[0-5][0-9]$/, {
    message: 'Informe um horário no formato HH:MM',
  })
  horario: string;

  @IsNotEmpty({
    message: 'Informe a localização',
  })
  @UuidValidate()
  @IfExistsValidate({ table: 'localizacao' })
  localizacaoId: string;

  @IsNotEmpty({
    message: 'Informe o dirigente',
  })
  @UuidValidate()
  @IfExistsValidate({ table: 'publicador' })
  dirigenteId: string;

  @IsNotEmpty({
    message: 'Informe o ajudante',
  })
  @UuidValidate()
  @IfExistsValidate({ table: 'publicador' })
  ajudanteId: string;

  @IsNotEmpty({
    message: 'Informe a congregação',
  })
  @CongregacaoIdValidate()
  @IfExistsValidate({ table: 'congregacao' })
  congregacaoId: string;
}

export class UpdateGrupoDto extends CreateGrupoDto {
  @IsNotEmpty({
    message: 'Informe o ID do grupo',
  })
  @UuidValidate()
  @IfExistsValidate({ table: 'grupo' })
  id: string;
}

export class QueryStringGrupoDto extends CongregacaoQueryString {
  @IsNotEmpty({
    message: 'Informe o ID do grupo',
  })
  @UuidValidate()
  @IfExistsValidate({ table: 'grupo' })
  grupoId: string;
}
