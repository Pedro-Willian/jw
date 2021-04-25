import React from 'react';
import { Grupo } from 'entities/grupo';
import { Button, Table } from 'antd';
import { EditButton, DeleteButton } from 'components/action-button';

type TableGrupoType = {
  loading: boolean;
  data: Grupo[];
  selected?: Grupo;
  setSelected: React.Dispatch<React.SetStateAction<Grupo | undefined>>;
  deleteRecord: (record: Grupo) => void;
};

export const TableGrupo = ({
  loading,
  data,
  selected,
  setSelected,
  deleteRecord,
}: TableGrupoType) => {
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Dirigente',
      dataIndex: ['dirigente', 'nomeExibicao'],
      key: 'dirigente',
    },
    {
      title: 'Ajudante',
      dataIndex: ['ajudante', 'nomeExibicao'],
      key: 'ajudante',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_text: string, record: Grupo) => (
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
