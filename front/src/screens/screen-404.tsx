import React from 'react';
import styled from 'styled-components';
import notFound from 'assets/404.jpg';
import { CentredImg } from 'components/centred-img';

const Img = styled.img`
  max-width: 100%;
`;

const Screen404 = (): JSX.Element => {
  return (
    <CentredImg>
      <Img src={notFound} alt="" />
    </CentredImg>
  );
};

export { Screen404 };
