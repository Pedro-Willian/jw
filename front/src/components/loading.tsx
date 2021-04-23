import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const FullSize = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 100%;
  width: 100%;
`;

export const Loading = () => {
  return (
    <FullSize>
      <Spin size="large" />
    </FullSize>
  );
};
