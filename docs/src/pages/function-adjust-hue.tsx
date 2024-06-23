import React, { useMemo, useState } from 'react';
import { adjustHue, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-adjust-hue';
import { getRandomNumber } from '../utils/get-random-number';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {}

const FunctionAdjustHuePage: React.FC<Props> = ({}) => {
  const [colorToAdjustHue, setColorToAdjustHue] = useState(randomColor());

  const [hueShift, setHueShift] = useState(getRandomNumber(-180, 180, 1));
  
  const adjustedHueColor = useMemo(() => {
    try {
      return adjustHue(colorToAdjustHue, hueShift);
    } catch (e) {
      return 'Invalid color format';
    }
  }, [colorToAdjustHue, hueShift]);

  return (
    <div>
      <h1>adjustHue function</h1>

      <Row>
        <ColorBox color={colorToAdjustHue} />
        
        <InputText 
          value={colorToAdjustHue}
          onChange={(e) => setColorToAdjustHue(e.target.value)}
        />

        <InputNumber 
          value={hueShift}
          onChange={(e) => setHueShift(Number(e.value))}
        />

        <ColorBox color={adjustedHueColor} />

        <Result>{adjustedHueColor}</Result>
      </Row>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionAdjustHuePage };
