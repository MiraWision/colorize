import styled, { css } from 'styled-components';

const Header1 = styled.h1<{ centered?: boolean }>`
  margin: 16px 0 8px;
  font-size: 32px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--surface-900);

  ${({ centered }) => centered && css`
    text-align: center;
  `}
`;

const Header2 = styled.h2<{ centered?: boolean }>`
  margin: 8px 0;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--surface-900);

  ${({ centered }) => centered && css`
    text-align: center;
  `}
`;

export {
  Header1,
  Header2,
};
