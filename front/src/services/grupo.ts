import Moment from 'moment';
import { RequestBuilder } from 'utils/request-builder';
import { Grupo } from 'entities/grupo';
import { ResponseList } from './types-request';

export type FormTypeGrupo<H extends Moment.Moment | string> = {
  id?: string;
  nome: string;
  dia: string;
  periodo: string;
  horario: H;
  localizacaoId: string;
  dirigenteId: string;
  ajudanteId: string;
  congregacaoId?: string;
};

const grupoToForm = (grupo: Grupo): FormTypeGrupo<Moment.Moment> => {
  const { horario, localizacao, dirigente, ajudante } = grupo;
  return {
    ...grupo,
    horario: Moment(horario, 'HH:mm:ss'),
    localizacaoId: localizacao.id,
    dirigenteId: dirigente.id,
    ajudanteId: ajudante.id,
  };
};

const formToPayload = (
  form: FormTypeGrupo<Moment.Moment>,
): FormTypeGrupo<string> => {
  return {
    ...form,
    horario: form.horario.format('HH:mm'),
  };
};

const getGrupos = (congregacaoId: string) =>
  new RequestBuilder<ResponseList<'grupos', Grupo>>()
    .withUrl('/grupo')
    .withQueryString({ congregacaoId })
    .call();

const saveGrupo = (form: FormTypeGrupo<Moment.Moment>, congregacaoId: string) =>
  new RequestBuilder<undefined, FormTypeGrupo<string>>()
    .withMethod('POST')
    .withUrl('/grupo')
    .withBody({ ...formToPayload(form), congregacaoId })
    .call();

const updateGrupo = (
  form: FormTypeGrupo<Moment.Moment>,
  grupoId: string,
  congregacaoId: string,
) =>
  new RequestBuilder<undefined, FormTypeGrupo<string>>()
    .withMethod('PUT')
    .withUrl('/grupo')
    .withBody({ ...formToPayload(form), id: grupoId, congregacaoId })
    .call();

const deleteGrupo = (congregacaoId: string, grupoId: string) =>
  new RequestBuilder()
    .withMethod('DELETE')
    .withUrl('/grupo')
    .withQueryString({ congregacaoId, grupoId })
    .call();

export { grupoToForm, getGrupos, saveGrupo, updateGrupo, deleteGrupo };
