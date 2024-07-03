import React, { useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { blendMultipleColors, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-blend-multiple-colors';
import { getRandomNumber } from '../utils/get-random-number';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ColorBox, Column, FlexibleContainer, Result, Row } from '../components/styles';

interface Props {
}

const FunctionBlendMultipleColorsPage: React.FC<Props> = ({}) => {
  const [colors, setColors] = useState([
    { color: randomColor(), weight: getRandomNumber(1, 3, 1) },
    { color: randomColor(), weight: getRandomNumber(1, 3, 1) },
  ]);

  const blendedColor = useMemo(() => {
    try {
      return blendMultipleColors(colors);
    } catch (e) {
      return 'Invalid color format or weights';
    }
  }, [colors]);

  const addColor = () => {
    setColors([...colors, { color: randomColor(), weight: getRandomNumber(1, 3, 1) }]);
  };

  const removeColor = (index: number) => {
    const updatedColors = [...colors];
    updatedColors.splice(index, 1);
    setColors(updatedColors);
  };

  const updateColor = (index: number, newColor: string) => {
    const updatedColors = [...colors];
    updatedColors[index].color = newColor;
    setColors(updatedColors);
  };

  const updateWeight = (index: number, newWeight: number) => {
    const updatedColors = [...colors];
    updatedColors[index].weight = newWeight;
    setColors(updatedColors);
  };

  return (
    <div>
      <h1>blendMultipleColors function</h1>

      <Column>
        {colors.map((colorObj, index) => (
          <FlexibleContainer key={index}>
            <Row>
              <ColorBox color={colorObj.color} />

              <InputText 
                value={colorObj.color}
                onChange={(e) => updateColor(index, e.target.value)}
              />
            </Row>

            <Row>
              <InputNumberMini
                min={1}
                max={100}
                step={1}
                value={colorObj.weight}
                showButtons
                onChange={(e) => updateWeight(index, Number(e.value))}
              />

              <ButtonStyled 
                onClick={() => removeColor(index)} 
                disabled={colors.length <= 2}
              >
                Remove
              </ButtonStyled>
            </Row>
          </FlexibleContainer>
        ))}

        <RowSpaced>
          <Row>
            <ColorBox color={blendedColor} />

            <Result>{blendedColor}</Result>
          </Row>

          <ButtonStyled onClick={addColor}>
            Add
          </ButtonStyled>
        </RowSpaced>
      </Column>

      <Markdown markdownText={content} />
    </div>
  );
};

const ButtonStyled = styled(Button)`
  width: 100px;
  justify-content: center;
`;

const RowSpaced = styled(Row)`
  justify-content: space-between;
  width: 460px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const InputNumberMini = styled(InputNumber)`
  input {
    width: 75px;
  }
`;

export { FunctionBlendMultipleColorsPage };