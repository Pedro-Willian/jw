import { Localizacao } from 'entities/localizacao';
import { RequestBuilder } from 'utils/request-builder';
import { ResponseList } from './types-request';

export type FormTypeLocalizacao = {
  id?: string;
  nome: string;
  endereco: string;
  congregacaoId?: string;
};

const getLocalizacoes = (congregacaoId: string) =>
  new RequestBuilder<ResponseList<'localizacoes', Localizacao>>()
    .withUrl('/localizacao')
    .withQueryString({ congregacaoId })
    .call();

const saveLocalizacao = (form: FormTypeLocalizacao, congregacaoId: string) =>
  new RequestBuilder<undefined, FormTypeLocalizacao>()
    .withMethod('POST')
    .withUrl('/localizacao')
    .withBody({ ...form, congregacaoId })
    .call();

const updateLocalizacao = (
  form: FormTypeLocalizacao,
  localizacaoId: string,
  congregacaoId: string,
) =>
  new RequestBuilder<undefined, FormTypeLocalizacao>()
    .withMethod('PUT')
    .withUrl('/localizacao')
    .withBody({ ...form, id: localizacaoId, congregacaoId })
    .call();

const deleteLocalizacao = (congregacaoId: string, localizacaoId: string) =>
  new RequestBuilder()
    .withMethod('DELETE')
    .withUrl('/localizacao')
    .withQueryString({ congregacaoId, localizacaoId })
    .call();

export {
  getLocalizacoes,
  saveLocalizacao,
  updateLocalizacao,
  deleteLocalizacao,
};
