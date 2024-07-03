import styled from 'styled-components';

const FlexibleContainer = styled.div`
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 12px;
  row-gap: 12px;

  @media (max-width: 768px) {
    flex-flow: column;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  row-gap: 12px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
`;

const Result = styled.div`
  font-size: 14px;
`;

const ColorBox = styled.div<{ color: string }>`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: ${({ color }) => (color && color.length) ? color : 'transparent'};
`;

export {
  FlexibleContainer,
  Column,
  Row,
  Result,
  ColorBox,
};
