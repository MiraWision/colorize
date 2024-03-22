import React, { useMemo, useState } from 'react';
import { adjustBrightness } from '@mirawision/colorize';

import { content } from '../content/function-adjust-brightness';
import { getRandomHexColor } from '../utils/get-random-color';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

const FunctionAdjustBrightnessPage: React.FC<Props> = ({}) => {
  const [colorToAdjustBrightness, setColorToAdjustBrightness] = useState(getRandomHexColor());
  const [brightnessLevel, setBrightnessLevel] = useState(10);
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

      <Row>
        <ColorBox color={colorToAdjustBrightness} />
        
        <InputText 
          value={colorToAdjustBrightness}
          onChange={(e) => setColorToAdjustBrightness(e.target.value)}
        />

        <InputNumber 
          value={brightnessLevel}
          onChange={(e) => setBrightnessLevel(Number(e.value))}
          showButtons
          min={-100}
          max={100}
          step={1} 
        />

        <ColorBox color={adjustedBrightnessColor} />

        <Result>{adjustedBrightnessColor}</Result>
      </Row>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionAdjustBrightnessPage };