import React, { useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { generateMultiSteppedGradient, isValidColor, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-generate-multi-stepped-gradient';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { ColorBox, Result, Row } from '../components/styles';

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

      <Row>
        <InputTextBig 
          value={gradientConfig}
          onChange={(e) => setGradientConfig(e.target.value)}
        />

        {gradientConfig.split(',').filter((item) => isValidColor(item.trim())).map((color) => (
          <ColorBox color={color} />
        ))}
      </Row>
    
      <Grid>
        {steppedGradient.map((color) => (
          <Row key={color}>
            <ColorBox color={color} />

            <Result>{color}</Result>
          </Row>
        ))}
      </Grid>

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
`;

export { FunctionGenerateMultiSteppedGradientPage };