import React from 'react';
import styled from 'styled-components';
import notFound from 'assets/404.jpg';
import { CentredImg } from 'components/centred-img';

const Img = styled.img`
  max-width: 100%;
`;

export const Screen404 = () => {
  return (
    <CentredImg>
      <Img src={notFound} alt="" />
    </CentredImg>
  );
};
