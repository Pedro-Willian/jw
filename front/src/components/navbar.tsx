import React from 'react';
import { Drawer } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ReducersType } from 'store/store';
import { menuChange } from 'store/menu/menu.action';

const DrawerCustom = styled(Drawer)`
  .ant-drawer-body {
    margin-top: 50px;
    padding: 0;
    padding-right: 1px;
  }

  @media (min-width: 992px) {
    .menu {
      display: none;
    }
  }
`;

/** Componente de menu que recolhe e expande com click */
export const Navbar = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { menuVisible } = useSelector((state: ReducersType) => state.menu);

  return (
    <DrawerCustom
      placement="left"
      onClose={() => dispatch(menuChange({ menuVisible: false }))}
      visible={menuVisible}
      width={300}
    >
      {children}
    </DrawerCustom>
  );
};
