import React, { useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { generateSteppedGradient, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-generate-stepped-gradient';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

const FunctionGenerateSteppedGradientPage: React.FC<Props> = ({}) => {
  const [colorToGradientOne, setColorToGradientOne] = useState(randomColor());
  const [colorToGradientTwo, setColorToGradientTwo] = useState(randomColor());
  const [stepsForGradient, setStepsForGradient] = useState(6);
  const steppedGradient = useMemo<string[]>(() => {
    try {
      return generateSteppedGradient(colorToGradientOne, colorToGradientTwo, stepsForGradient);
    } catch (e) {
      return [];
    }
  }, [colorToGradientOne, colorToGradientTwo, stepsForGradient]);
  
  return (
    <div>
      <h1>generateSteppedGradient function</h1>

      <Row>
        <ColorBox color={colorToGradientOne} />
          
        <InputText 
          value={colorToGradientOne}
          onChange={(e) => setColorToGradientOne(e.target.value)}
        />

        <InputNumber 
          value={stepsForGradient} 
          onChange={(e) => setStepsForGradient(e.value ?? 3)} 
          showButtons
          min={1}
          max={25} 
        />

        <InputText 
          value={colorToGradientTwo}
          onChange={(e) => setColorToGradientTwo(e.target.value)}
        />

        <ColorBox color={colorToGradientTwo} />
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

export { FunctionGenerateSteppedGradientPage };