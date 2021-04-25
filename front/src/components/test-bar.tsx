import { Modal } from 'antd';
import styled from 'styled-components';

export const TestBar = () => {
  const StyleBar = styled.div`
    position: absolute;
    z-index: 9;
    background-color: #f09000;
    color: white;
    font-weight: bold;
    width: 100%;
    height: 20px;
    text-align: center;
    box-shadow: 0px 2px 2px rgb(0 0 0 / 20%);
  `;
  const message = () => {
    Modal.info({
      title: 'Informações de acesso',
      content: <>Logins:</>,
      className: 'allow-select',
    });
  };

  return (
    <StyleBar>
      Versão de teste.{' '}
      <a role="button" onClick={message}>
        Informações de acesso
      </a>
    </StyleBar>
  );
};
