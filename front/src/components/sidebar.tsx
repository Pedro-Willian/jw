import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { menuChange } from 'store/menu/menu.action';

const SiderCustom = styled(Layout.Sider)`
  height: 100vh;
  min-height: 100%;
  border-right: 1px solid #ccc;
  overflow-y: auto;
  overflow-x: hidden;

  .ant-layout-sider-children {
    padding-top: 20px;
  }

  @media (max-width: 992px) {
    border-right: none;
  }
`;

/** Componente de menu fixo quando estiver em telas maiores */
export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  return (
    <SiderCustom
      className="sidebar"
      breakpoint="lg"
      theme="light"
      collapsedWidth={0}
      trigger={null}
      onBreakpoint={(broken: boolean) =>
        dispatch(menuChange({ menuVisible: false, screenSmall: broken }))
      }
      width={300}
    >
      {children}
    </SiderCustom>
  );
};
