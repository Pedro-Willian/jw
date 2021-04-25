import React, { useEffect, useState } from 'react';
import { PageOrganizer } from 'components/page-organizer';
import { useForm } from 'antd/lib/form/Form';
import { Localizacao } from 'entities/localizacao';
import {
  deleteLocalizacao,
  FormTypeLocalizacao,
  getLocalizacoes,
  saveLocalizacao,
  updateLocalizacao,
} from 'services/localizacao';
import { useSelector } from 'react-redux';
import { ReducersType } from 'store/store';
import { message } from 'antd';
import { ErrorMessage } from 'services/types-request';
import { Confirm } from 'components/confirm';
import { FormLocalizacao } from './form-localizacao';
import { TableLocalizacao } from './table-localizacao';

export const LocalizacaoScreen = () => {
  const [form] = useForm<FormTypeLocalizacao>();
  const { congregacao } = useSelector((state: ReducersType) => state.user);
  const [loading, setLoading] = useState(true);
  const [localizacoes, setLocalizacoes] = useState<Localizacao[]>([]);
  const [selected, setSelected] = useState<Localizacao>();

  const carregarDados = () => {
    getLocalizacoes(congregacao.id)
      .then((localizacoesResponse) =>
        setLocalizacoes(localizacoesResponse.localizacoes),
      )
      .catch((e: ErrorMessage) => message.error(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    if (selected) form.setFieldsValue(selected);
    else form.resetFields();
  }, [selected]);

  const onSave = () => {
    const localizacao = form.getFieldsValue();
    setLoading(true);
    if (!selected)
      saveLocalizacao(localizacao, congregacao.id)
        .then(() => {
          form.resetFields();
          carregarDados();
        })
        .catch((e: ErrorMessage) => {
          setLoading(false);
          message.error(e.message);
        });
    else
      updateLocalizacao(localizacao, selected.id, congregacao.id)
        .then(() => {
          form.resetFields();
          carregarDados();
          setSelected(undefined);
        })
        .catch((e: ErrorMessage) => {
          setLoading(false);
          message.error(e.message);
        });
  };

  const deleteRecord = (record: Localizacao) => {
    setLoading(true);
    deleteLocalizacao(congregacao.id, record.id)
      .then(() => carregarDados())
      .catch((e: ErrorMessage) => {
        setLoading(false);
        message.error(e.message);
      });
  };

  const confirmDeleteRecord = (record: Localizacao) => {
    Confirm({ onOk: () => deleteRecord(record) });
  };

  return (
    <PageOrganizer>
      <TableLocalizacao
        loading={loading}
        data={localizacoes}
        selected={selected}
        setSelected={setSelected}
        deleteRecord={confirmDeleteRecord}
      />
      <FormLocalizacao form={form} onSave={onSave} />
    </PageOrganizer>
  );
};
