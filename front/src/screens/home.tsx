import React from 'react';
import styled from 'styled-components';
import logo512 from 'assets/logo512.png';
import { CentredImg } from 'components/centred-img';

const Img = styled.img`
  width: 15%;
  filter: grayscale(40%);
  @media (max-width: 991px) {
    width: 50%;
  }
`;

const H1 = styled.h1`
  font-size: 3em;
`;

export const HomeScreen = () => {
  return (
    <CentredImg>
      <Img src={logo512} alt="" />
      <H1>Sistema</H1>
    </CentredImg>
  );
};
