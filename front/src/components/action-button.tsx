import React from 'react';
import { Button, Tooltip } from 'antd';
import styled from 'styled-components';
import { faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from './font-awesome-icon';

export const ActionButton = styled(Button)`
  margin-right: 15px;

  svg {
    vertical-align: 0;
    margin-right: 0;
  }
`;

type ActionButtonProps = {
  onClick: () => void;
};

export const EditButton = ({ onClick }: ActionButtonProps) => (
  <Tooltip title="Editar">
    <ActionButton
      type="primary"
      icon={<FontAwesomeIcon icon={faEdit} marginRight={false} />}
      onClick={onClick}
    />
  </Tooltip>
);

export const DeleteButton = ({ onClick }: ActionButtonProps) => (
  <Tooltip title="Excluir">
    <ActionButton
      danger
      icon={<FontAwesomeIcon icon={faTrashAlt} marginRight={false} />}
      onClick={onClick}
    />
  </Tooltip>
);
