import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  FormInstance,
  Input,
  message,
  Select,
  TimePicker,
} from 'antd';
import { semanaOptions } from 'enum/semana';
import { periodoOptions } from 'enum/periodo';
import { getPublicadores } from 'services/publicador';
import { OptionsType } from 'components/options-type';
import { useSelector } from 'react-redux';
import { ReducersType } from 'store/store';
import { ErrorMessage } from 'services/types-request';
import { getLocalizacao } from 'services/localizacao';

type TableGrupoType = {
  form: FormInstance;
  onSave: () => void;
};

export const FormGrupo = ({ form, onSave }: TableGrupoType) => {
  const { congregacao } = useSelector((state: ReducersType) => state.user);
  const [localizacao, setLocalizacao] = useState<OptionsType>([]);
  const [dirigenteAjudante, setDirigenteAjudante] = useState<OptionsType>([]);

  useEffect(() => {
    getPublicadores(congregacao.id, ['anciao', 'servo'])
      .then((publicadorResponse) => {
        setDirigenteAjudante(
          publicadorResponse.publicadores.map((publicador) => ({
            value: publicador.id,
            label: publicador.nomeExibicao,
          })),
        );
      })
      .catch((e: ErrorMessage) => message.error(e.message));

    getLocalizacao(congregacao.id)
      .then((localizacaoResponse) => {
        setLocalizacao(
          localizacaoResponse.localizacoes.map((local) => ({
            value: local.id,
            label: local.nome,
          })),
        );
      })
      .catch((e: ErrorMessage) => message.error(e.message));
  }, []);

  return (
    <Form layout="vertical" form={form} onFinish={onSave}>
      <Form.Item
        label="Nome"
        name="nome"
        rules={[{ required: true, message: 'Preencha o nome' }]}
      >
        <Input autoFocus />
      </Form.Item>
      <Form.Item
        label="Dia"
        name="dia"
        rules={[{ required: true, message: 'Escolha o dia' }]}
      >
        <Select options={semanaOptions} />
      </Form.Item>
      <Form.Item
        label="Período"
        name="periodo"
        rules={[{ required: true, message: 'Escolha o período' }]}
      >
        <Select options={periodoOptions} />
      </Form.Item>
      <Form.Item
        label="Horário"
        name="horario"
        rules={[{ required: true, message: 'Preencha o horário' }]}
      >
        <TimePicker format="HH:mm" showNow={false} placeholder="" />
      </Form.Item>
      <Form.Item
        label="Localização"
        name="localizacaoId"
        rules={[{ required: true, message: 'Escolha a localização' }]}
      >
        <Select options={localizacao} />
      </Form.Item>
      <Form.Item
        label="Dirigente"
        name="dirigenteId"
        rules={[{ required: true, message: 'Escolha o dirigente' }]}
      >
        <Select options={dirigenteAjudante} />
      </Form.Item>
      <Form.Item
        label="Ajudante"
        name="ajudanteId"
        rules={[{ required: true, message: 'Escolha o ajudante' }]}
      >
        <Select options={dirigenteAjudante} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Salvar
        </Button>
      </Form.Item>
    </Form>
  );
};
