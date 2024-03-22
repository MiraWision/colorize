import React, { useMemo, useState } from 'react';
import { adjustSaturation } from '@mirawision/colorize';

import { content } from '../content/function-adjust-saturation';
import { getRandomHexColor } from '../utils/get-random-color';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

const FunctionAdjustSaturationPage: React.FC<Props> = ({}) => {
  const [colorToAdjustSaturation, setColorToAdjustSaturation] = useState(getRandomHexColor());
  const [saturationLevel, setSaturationLevel] = useState(10);
  const adjustedSaturationColor = useMemo(() => {
    try {
      return adjustSaturation(colorToAdjustSaturation, saturationLevel);
    } catch (e) {
      return 'Invalid color format';
    }
  }, [colorToAdjustSaturation, saturationLevel]);

  return (
    <div>
      <h1>adjustSaturation function</h1>

      <Row>
        <ColorBox color={colorToAdjustSaturation} />
        
        <InputText 
          value={colorToAdjustSaturation}
          onChange={(e) => setColorToAdjustSaturation(e.target.value)}
        />

        <InputNumber 
          value={saturationLevel}
          onChange={(e) => setSaturationLevel(Number(e.value))}
        />

        <ColorBox color={adjustedSaturationColor} />

        <Result>{adjustedSaturationColor}</Result>
      </Row>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionAdjustSaturationPage };