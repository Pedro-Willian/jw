import { IsNotEmpty } from 'class-validator';
import { CongregacaoQueryString } from '~modules/congregacao/dto/congregacao-query.dto';
import { CongregacaoIdValidate } from '~utils/congregacao-id.validate';
import { IfExistsValidate } from '~utils/if-exists.validate';
import { UuidValidate } from '~utils/uuid.validate';

export class CreateLocalizacaoDto {
  @IsNotEmpty({
    message: 'Informe o nome',
  })
  nome: string;

  @IsNotEmpty({
    message: 'Informe o endereço',
  })
  endereco: string;

  @IsNotEmpty({
    message: 'Informe a congregação',
  })
  @CongregacaoIdValidate()
  @IfExistsValidate({ table: 'congregacao' })
  congregacaoId: string;
}

export class UpdateLocalizacaoDto extends CreateLocalizacaoDto {
  @IsNotEmpty({
    message: 'Informe o ID da localização',
  })
  @UuidValidate()
  @IfExistsValidate({ table: 'localizacao' })
  id: string;
}

export class QueryStringLocalizacaoDto extends CongregacaoQueryString {
  @IsNotEmpty({
    message: 'Informe o ID da localizacao',
  })
  @UuidValidate()
  @IfExistsValidate({ table: 'localizacao' })
  localizacaoId: string;
}
