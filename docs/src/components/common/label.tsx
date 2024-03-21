import React from 'react';
import styled from 'styled-components';

interface Props {
  children: string;
}

const Label: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  );
}

const Container = styled.div`
  margin: 4px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--surface-900);
`;

export { Label };