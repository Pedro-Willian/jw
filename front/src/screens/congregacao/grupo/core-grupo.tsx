import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import { PageOrganizer } from 'components/page-organizer';
import { useForm } from 'antd/lib/form/Form';
import { Grupo } from 'entities/grupo';
import {
  deleteGrupo,
  FormTypeGrupo,
  getGrupos,
  grupoToForm,
  saveGrupo,
  updateGrupo,
} from 'services/grupo';
import { useSelector } from 'react-redux';
import { ReducersType } from 'store/store';
import { message } from 'antd';
import { ErrorMessage } from 'services/types-request';
import { Confirm } from 'components/confirm';
import { FormGrupo } from './form-grupo';
import { TableGrupo } from './table-grupo';

export const GrupoScreen = () => {
  const [form] = useForm<FormTypeGrupo<Moment.Moment>>();
  const { congregacao } = useSelector((state: ReducersType) => state.user);
  const [loading, setLoading] = useState(true);
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [selected, setSelected] = useState<Grupo>();

  const carregarDados = () => {
    getGrupos(congregacao.id)
      .then((gruposResponse) => setGrupos(gruposResponse.grupos))
      .catch((e: ErrorMessage) => message.error(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    if (selected) form.setFieldsValue(grupoToForm(selected));
    else form.resetFields();
  }, [selected]);

  const onSave = () => {
    const grupo = form.getFieldsValue();
    setLoading(true);
    if (!selected)
      saveGrupo(grupo, congregacao.id)
        .then(() => {
          form.resetFields();
          carregarDados();
        })
        .catch((e: ErrorMessage) => message.error(e.message));
    else
      updateGrupo(grupo, selected.id, congregacao.id)
        .then(() => {
          form.resetFields();
          carregarDados();
          setSelected(undefined);
        })
        .catch((e: ErrorMessage) => message.error(e.message));
  };

  const deleteRecord = (record: Grupo) => {
    setLoading(true);
    deleteGrupo(congregacao.id, record.id)
      .then(() => carregarDados())
      .catch((e: ErrorMessage) => message.error(e.message));
  };

  const confirmDeleteRecord = (record: Grupo) => {
    Confirm({ onOk: () => deleteRecord(record) });
  };

  return (
    <PageOrganizer>
      <TableGrupo
        loading={loading}
        data={grupos}
        selected={selected}
        setSelected={setSelected}
        deleteRecord={confirmDeleteRecord}
      />
      <FormGrupo form={form} onSave={onSave} />
    </PageOrganizer>
  );
};
