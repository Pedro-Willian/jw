import { IsNotEmpty } from 'class-validator';
import { CongregacaoIdValidate } from '~utils/congregacao-id.validate';
import { IfExistsValidate } from '~utils/if-exists.validate';

export class CongregacaoQueryString {
  @IsNotEmpty({
    message: 'Informe a congregação',
  })
  @CongregacaoIdValidate()
  @IfExistsValidate({ table: 'congregacao' })
  congregacaoId: string;
}
