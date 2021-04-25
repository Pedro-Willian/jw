import React from 'react';
import { Localizacao } from 'entities/localizacao';
import { Button, Table } from 'antd';
import { EditButton, DeleteButton } from 'components/action-button';

type TableLocalizacaoType = {
  loading: boolean;
  data: Localizacao[];
  selected?: Localizacao;
  setSelected: React.Dispatch<React.SetStateAction<Localizacao | undefined>>;
  deleteRecord: (record: Localizacao) => void;
};

export const TableLocalizacao = ({
  loading,
  data,
  selected,
  setSelected,
  deleteRecord,
}: TableLocalizacaoType) => {
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Endereço',
      dataIndex: 'endereco',
      key: 'endereco',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_text: string, record: Localizacao) => (
        <>
          <EditButton onClick={() => setSelected(record)} />
          {record.id !== selected?.id && (
            <DeleteButton onClick={() => deleteRecord(record)} />
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => setSelected(undefined)}
        style={{ marginBottom: '10px' }}
      >
        Novo
      </Button>
      <Table
        className="allow-select"
        dataSource={data}
        rowKey="id"
        loading={loading}
        columns={columns}
        pagination={false}
      />
    </>
  );
};
