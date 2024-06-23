import React, { useMemo, useState } from 'react';
import { ColorFormat, changeOpacity, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-change-opacity';
import { getRandomNumber } from '../utils/get-random-number';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

const FunctionChangeOpacityPage: React.FC<Props> = ({}) => {
  const [colorToChangeOpacity, setColorToChangeOpacity] = useState(randomColor(ColorFormat.HEXA));

  const [opacity, setOpacity] = useState(getRandomNumber(0.05, 0.95, 0.05));

  const opacityAdjustedColor = useMemo(() => {
    try {
      return changeOpacity(colorToChangeOpacity, opacity);
    } catch (e) {
      return 'Invalid color format';
    }
  }, [colorToChangeOpacity, opacity]);

  return (
    <div>
      <h1>changeOpacity function</h1>

      <Row>
        <ColorBox color={colorToChangeOpacity} />
        
        <InputText 
          value={colorToChangeOpacity}
          onChange={(e) => setColorToChangeOpacity(e.target.value)}
        />

        <InputNumber 
          min={0}
          max={1}
          step={0.05}
          showButtons
          value={opacity}
          onChange={(e) => setOpacity(Number(e.value))}
        />

        <ColorBox color={opacityAdjustedColor} />

        <Result>{opacityAdjustedColor}</Result>
      </Row>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionChangeOpacityPage };