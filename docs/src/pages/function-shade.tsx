import React, { useMemo, useState } from 'react';
import { shade } from '@mirawision/colorize';

import { content } from '../content/function-shade';
import { getRandomHexColor } from '../utils/get-random-color';
import { getRandomNumber } from '../utils/get-random-numer';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

const FunctionShadePage: React.FC<Props> = ({}) => {
  const [colorToShade, setColorToShade] = useState(getRandomHexColor());
  const [shadePercentage, setShadePercentage] = useState(getRandomNumber(0.05, 0.95, 0.05));
  const shadedColor = useMemo(() => {
    try {
      return shade(colorToShade, shadePercentage);
    } catch (e) {
      return 'Invalid color format';
    }
  }, [colorToShade, shadePercentage]);

  return (
    <div>
      <h1>shade function</h1>
   
      <Row>
        <ColorBox color={colorToShade} />
        
        <InputText 
          value={colorToShade}
          onChange={(e) => setColorToShade(e.target.value)}
        />

        <InputNumber 
          value={shadePercentage}
          onChange={(e) => setShadePercentage(Number(e.value))}
          showButtons
          min={0}
          max={1}
          step={0.05} 
        />

        <ColorBox color={shadedColor} />

        <Result>{shadedColor}</Result>
      </Row>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionShadePage };