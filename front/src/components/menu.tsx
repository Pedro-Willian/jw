import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { menuChange } from 'store/menu/menu.action';
import styled from 'styled-components';
import { ReducersType } from 'store/store';
import { logout } from 'services/auth';
import { getMenu, MenuItem, Submenu } from './menu-data';

const { Item, SubMenu } = Menu;

const Logged = styled.div`
  padding: 20px 16px 20px 40px;

  a {
    text-decoration: underline;
    color: rgba(0, 0, 0, 0.85);
    :hover {
      color: #1890ff;
    }
  }
`;
const StyledMenu = styled(Menu)`
  border-right: none;
`;

const MenuComponent = () => {
  const [selectedKeys, setSelectedKeys] = useState('');
  const [openKeys, setOpenKeys] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: ReducersType) => state.user);

  const [menuList, setMenuList] = useState<Array<MenuItem | Submenu>>();

  const getActualMenu = () => {
    const path = history.location.pathname.split('/')[1];
    const getMenuList = getMenu();

    let openKeysActual = '';
    let selectedKeysActual = '';

    getMenuList.forEach((m) => {
      if ('submenu' in m) {
        const sub = m.submenu?.find((s) => s.linkTo === path);
        if (sub) {
          openKeysActual = m.key;
          selectedKeysActual = sub?.key;
        }
      } else if (m.linkTo === path) {
        selectedKeysActual = m.key;
      }
    });

    return [selectedKeysActual, openKeysActual];
  };

  const setMenu = () => {
    const [selectedKeysActual, openKeysActual] = getActualMenu();
    setSelectedKeys(selectedKeysActual);
    setOpenKeys(openKeysActual);
  };

  useEffect(() => {
    setMenu();
    setMenuList(getMenu());
  }, []);

  useEffect(() => {
    setMenu();
  }, [history.location.pathname]);

  const onOpenChange = (openKeysChange: React.Key[]) => {
    setOpenKeys((openKeysChange[1] || openKeysChange[0]) as string);
  };

  const ItemRender = (menuRender: MenuItem) => {
    const { key, title, icon, linkTo } = menuRender;
    return (
      <Item key={key} icon={icon}>
        {title}
        <Link
          to={'/' + linkTo}
          onClick={() => dispatch(menuChange({ menuVisible: false }))}
        />
      </Item>
    );
  };

  return (
    <>
      <Logged>
        Bem-vindo {user.nomeExibicao}.{' '}
        <Link to="/" onClick={() => logout(history, dispatch)}>
          Sair
        </Link>
      </Logged>
      {menuList && (
        <StyledMenu
          triggerSubMenuAction="click"
          onOpenChange={onOpenChange}
          selectedKeys={selectedKeys ? [selectedKeys] : []}
          openKeys={openKeys ? [openKeys] : []}
          mode="inline"
          theme="light"
          inlineIndent={40}
        >
          {menuList.map((menu) => {
            if ('submenu' in menu) {
              const m = menu as Submenu;
              return (
                <SubMenu key={m.key} icon={m.icon} title={m.title}>
                  {m.submenu.map((sub) => ItemRender(sub))}
                </SubMenu>
              );
            }
            return ItemRender(menu as MenuItem);
          })}
        </StyledMenu>
      )}
    </>
  );
};

export { MenuComponent };
