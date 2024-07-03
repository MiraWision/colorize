import React, { useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { generateMultiSteppedGradient, isValidColor, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-generate-multi-stepped-gradient';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { ColorBox, FlexibleContainer, Result, Row } from '../components/styles';

interface Props {
}

const FunctionGenerateMultiSteppedGradientPage: React.FC<Props> = ({}) => {
  const [gradientConfig, setGradientConfig] = useState(`${randomColor()}, 3, ${randomColor()}, 3, ${randomColor()}`);
  const steppedGradient = useMemo<string[]>(() => {
    try {
      return generateMultiSteppedGradient(...gradientConfig.split(',').map((item, i) => i % 2 === 0 ? item.trim() : parseInt(item)));
    } catch (e) {
      return [];
    }
  }, [gradientConfig]);
  
  return (
    <div>
      <h1>generateMultiSteppedGradient function</h1>

      <FlexibleContainer>
        <InputTextBig 
          value={gradientConfig}
          onChange={(e) => setGradientConfig(e.target.value)}
        />

        <Row>
          {gradientConfig.split(',').filter((item) => isValidColor(item.trim())).map((color) => (
            <ColorBox color={color} />
          ))}
        </Row>
      </FlexibleContainer>
    
      <FlexibleContainer>
        {steppedGradient.map((color) => (
          <Row key={color}>
            <ColorBox color={color} />

            <Result>{color}</Result>
          </Row>
        ))}
      </FlexibleContainer>

      <Markdown markdownText={content} />
    </div>
  );
}

const Grid = styled.div`
  display: grid;
  gap: 12px 0;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  margin-top: 12px;
`;

const InputTextBig = styled(InputText)`
  width: 400px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export { FunctionGenerateMultiSteppedGradientPage };