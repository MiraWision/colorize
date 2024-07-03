import React, { useMemo, useState } from 'react';
import { adjustBrightness, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-adjust-brightness';
import { getRandomNumber } from '../utils/get-random-number';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ColorBox, FlexibleContainer, Result, Row } from '../components/styles';

interface Props {
}

const FunctionAdjustBrightnessPage: React.FC<Props> = ({}) => {
  const [colorToAdjustBrightness, setColorToAdjustBrightness] = useState(randomColor());
  const [brightnessLevel, setBrightnessLevel] = useState(getRandomNumber(-50, 50, 1));
  const adjustedBrightnessColor = useMemo(() => {
    try {
      return adjustBrightness(colorToAdjustBrightness, brightnessLevel);
    } catch (e) {
      return 'Invalid color format';
    }
  }, [colorToAdjustBrightness, brightnessLevel]);
  
  return (
    <div>
      <h1>adjustBrightness function</h1>

      <FlexibleContainer>
        <Row>
          <ColorBox color={colorToAdjustBrightness} />
          
          <InputText 
            value={colorToAdjustBrightness}
            onChange={(e) => setColorToAdjustBrightness(e.target.value)}
          />
        </Row>

        <InputNumber 
          value={brightnessLevel}
          onChange={(e) => setBrightnessLevel(Number(e.value))}
          showButtons
          min={-100}
          max={100}
          step={1} 
        />

        <Row>
          <ColorBox color={adjustedBrightnessColor} />

          <Result>{adjustedBrightnessColor}</Result>
        </Row>
      </FlexibleContainer>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionAdjustBrightnessPage };