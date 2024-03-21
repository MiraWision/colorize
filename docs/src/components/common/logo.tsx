import React from 'react';
import styled from 'styled-components';

interface Props {

}

const Logo: React.FC<Props> = () => {
  return (
    <Container>
      <Text>Colorize</Text>
      <SubText>by MiraWision</SubText>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: fit-content;
`;

const Text = styled.div`
  font-family: "Rajdhani", sans-serif;
  font-weight: 400;
  font-size: 30px;
  color: var(--primary-color);
  user-select: none;
`;

const SubText = styled.div`
  margin-top: -6px;
  font-family: "Rajdhani", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: var(--primary-color);
  user-select: none;
`;

export { Logo };
