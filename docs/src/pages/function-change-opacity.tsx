import React, { useMemo, useState } from 'react';
import { changeOpacity } from '@mirawision/colorize';

import { content } from '../content/function-change-opacity';
import { getRandomHexaColor } from '../utils/get-random-color';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

const FunctionChangeOpacityPage: React.FC<Props> = ({}) => {
  const [colorToChangeOpacity, setColorToChangeOpacity] = useState(getRandomHexaColor());
  const [opacity, setOpacity] = useState(1);
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