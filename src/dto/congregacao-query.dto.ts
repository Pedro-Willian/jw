import { IsNotEmpty } from 'class-validator';

export class CongregacaoQuerystring {
  @IsNotEmpty({
    message: 'Informe a congregação',
  })
  congregacaoId: string;
}
