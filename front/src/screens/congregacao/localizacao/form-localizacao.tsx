import React from 'react';
import { Button, Form, FormInstance, Input } from 'antd';

type TableLocalizacaoType = {
  form: FormInstance;
  onSave: () => void;
};

export const FormLocalizacao = ({ form, onSave }: TableLocalizacaoType) => {
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
        label="Endereço"
        name="endereco"
        rules={[{ required: true, message: 'Preencha o endereço' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Salvar
        </Button>
      </Form.Item>
    </Form>
  );
};
