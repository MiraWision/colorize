import React, { useMemo, useState } from 'react';
import { adjustSaturation, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-adjust-saturation';
import { getRandomNumber } from '../utils/get-random-number';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ColorBox, FlexibleContainer, Result, Row } from '../components/styles';

interface Props {
}

const FunctionAdjustSaturationPage: React.FC<Props> = ({}) => {
  const [colorToAdjustSaturation, setColorToAdjustSaturation] = useState(randomColor());
  const [saturationLevel, setSaturationLevel] = useState(getRandomNumber(-50, 50, 1));
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

      <FlexibleContainer>
        <Row>
          <ColorBox color={colorToAdjustSaturation} />
          
          <InputText 
            value={colorToAdjustSaturation}
            onChange={(e) => setColorToAdjustSaturation(e.target.value)}
          />
        </Row>

        <InputNumber 
          value={saturationLevel}
          onChange={(e) => setSaturationLevel(Number(e.value))}
          showButtons
          min={-100}
          max={100}
          step={1}
        />

        <Row>
          <ColorBox color={adjustedSaturationColor} />

          <Result>{adjustedSaturationColor}</Result>
        </Row>
      </FlexibleContainer>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionAdjustSaturationPage };