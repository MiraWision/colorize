import React from 'react';
import styled from 'styled-components';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { MenuList } from '../components/menu/menu-list';
import { Logo } from '../components/common/logo';

interface Props {
  children: React.ReactNode;
}

const BaseLayout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <Sidebar>
        <Logo />
        <MenuList />
      </Sidebar>
      <Content>
        {children}
      </Content>
    </Container>
  );
}

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

export { BaseLayout };