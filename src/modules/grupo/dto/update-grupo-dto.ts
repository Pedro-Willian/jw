import { IsNotEmpty } from 'class-validator';
import { IfExistsValidate } from '~utils/if-exists.validate';
import { UuidValidate } from '~utils/uuid.validate';
import { CreateGrupoDto } from './create-grupo-dto';

export class UpdateGrupoDto extends CreateGrupoDto {
  @IsNotEmpty({
    message: 'Informe o ID',
  })
  @UuidValidate()
  @IfExistsValidate({ table: 'grupo' })
  id: string;
}
