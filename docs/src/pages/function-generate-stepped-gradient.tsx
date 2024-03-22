import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { generateSteppedGradient } from '@mirawision/colorize';

import { content } from '../content/function-generate-stepped-gradient';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ColorBox, Column, Result, Row } from '../components/styles';

interface Props {
}

const FunctionGenerateSteppedGradientPage: React.FC<Props> = ({}) => {
  const [colorToGradientOne, setColorToGradientOne] = useState('#903060');
  const [colorToGradientTwo, setColorToGradientTwo] = useState('#206080');
  const [stepsForGradient, setStepsForGradient] = useState(3);
  const steppedGradient = useMemo<string[]>(() => {
    try {
      return generateSteppedGradient(colorToGradientOne, colorToGradientTwo, stepsForGradient);
    } catch (e) {
      return [];
    }
  }, [colorToGradientOne, colorToGradientTwo, stepsForGradient]);
  
  return (
    <div>
      FunctionGenerateSteppedGradientPage

      <Row>
        <ColorBox color={colorToGradientOne} />
          
        <InputText 
          value={colorToGradientOne}
          onChange={(e) => setColorToGradientOne(e.target.value)}
        />

        <ColorBox color={colorToGradientTwo} />
          
        <InputText 
          value={colorToGradientTwo}
          onChange={(e) => setColorToGradientTwo(e.target.value)}
        />

        <InputNumber 
          value={stepsForGradient} 
          onChange={(e) => setStepsForGradient(e.value ?? 3)} 
          showButtons
          min={1}
          max={25} 
        />
      </Row>
    
      <Column>
        {steppedGradient.map((color) => (
          <Row key={color}>
            <ColorBox color={color} />

            <Result>{color}</Result>
          </Row>
        ))}
      </Column>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionGenerateSteppedGradientPage };