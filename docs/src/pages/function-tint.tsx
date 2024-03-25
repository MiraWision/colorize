import React, { useMemo, useState } from 'react';
import { tint } from '@mirawision/colorize';

import { content } from '../content/function-tint';
import { getRandomHexColor } from '../utils/get-random-color';
import { getRandomNumber } from '../utils/get-random-numer';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

const FunctionTintPage: React.FC<Props> = ({}) => {
  const [colorToTint, setColorToTint] = useState(getRandomHexColor());
  const [tintPercentage, setTintPercentage] = useState(getRandomNumber(0.05, 0.95, 0.05));
  const tintedColor = useMemo(() => {
    try {
      return tint(colorToTint, tintPercentage);
    } catch (e) {
      return 'Invalid color format';
    }
  }, [colorToTint, tintPercentage]);

  return (
    <div>
      <h1>tint function</h1>
   
      <Row>
        <ColorBox color={colorToTint} />
        
        <InputText 
          value={colorToTint}
          onChange={(e) => setColorToTint(e.target.value)}
        />

        <InputNumber 
          value={tintPercentage}
          onChange={(e) => setTintPercentage(Number(e.value))}
          showButtons
          min={0}
          max={1}
          step={0.05} 
        />

        <ColorBox color={tintedColor} />

        <Result>{tintedColor}</Result>
      </Row>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionTintPage };