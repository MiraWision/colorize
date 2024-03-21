import React from 'react';
import styled from 'styled-components';

import { Logo } from './components/common/logo';
import { MenuList } from './components/menu/menu-list';

const App: React.FC = () => (
  <Container>
    <Sidebar>
      <Logo />
      <MenuList />
    </Sidebar>
    <Content>
      <h1>Hello, React with !</h1>
    </Content>
  </Container>
);

const Container = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 240px calc(100vw - 240px);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  min-height: 600px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative; 
`;

const Content = styled.div`
  padding: 24px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default App;
