import React, { useEffect, useState } from 'react';
import { Button, Layout } from 'antd';
import styled from 'styled-components';
import { Route, useLocation } from 'react-router-dom';
import { getRoute } from 'router';
import { Sidebar } from 'components/sidebar';
import { Navbar } from 'components/navbar';
import { useDispatch, useSelector } from 'react-redux';
import { ReducersType } from 'store/store';
import { menuChange } from 'store/menu/menu.action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { MenuComponent } from './components/menu';

const DivContent = styled.div`
  background: #ffffff;
  height: 100%;
  border-radius: 4px;
  padding: 22px;
  border: 1px solid #ccc;
`;

const LayoutMain = styled(Layout)`
  min-height: 100vh;
`;

const LayoutRow = styled(Layout)`
  flex-direction: row;
`;

const LayoutColumn = styled(Layout)`
  flex-direction: column;
`;

const HeaderApp = styled(Layout.Header)`
  background-color: #ffffff;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const ContentApp = styled(Layout.Content)`
  margin: 16px;
  min-height: calc(100vh - 32px - 64px);
`;

const ButtonMenu = styled(Button)`
  height: 44px;
  margin-right: 15px;
`;

function App(): JSX.Element {
  const location = useLocation();
  const dispatch = useDispatch();
  const { screenSmall } = useSelector((state: ReducersType) => state.menu);
  const [router, setRouter] = useState(getRoute(location.pathname));

  const showMenu = () => {
    dispatch(menuChange({ menuVisible: true }));
  };

  useEffect(() => {
    setRouter(getRoute(location.pathname));
  }, [location]);

  return (
    <LayoutMain>
      <LayoutRow>
        <Sidebar>
          <MenuComponent />
        </Sidebar>
        <Navbar>
          <MenuComponent />
        </Navbar>
        <LayoutColumn>
          <HeaderApp>
            {screenSmall && (
              <ButtonMenu onClick={showMenu}>
                <FontAwesomeIcon icon={faBars} />
              </ButtonMenu>
            )}
            <Title>{router.title}</Title>
          </HeaderApp>
          <ContentApp>
            <DivContent>
              <Route path={router.url} exact component={router.component} />
            </DivContent>
          </ContentApp>
        </LayoutColumn>
      </LayoutRow>
    </LayoutMain>
  );
}

export { App };
