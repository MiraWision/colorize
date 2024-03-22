import styled from 'styled-components';

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
  background-color: ${({ color }) => color};
`;

export {
  Column,
  Row,
  Result,
  ColorBox,
};
