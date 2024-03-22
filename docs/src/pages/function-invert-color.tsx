import React, { useMemo, useState } from 'react';
import { invertColor } from '@mirawision/colorize';

import { content } from '../content/function-invert-color';
import { getRandomHexColor } from '../utils/get-random-color';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

const FunctionInvertColorPage: React.FC<Props> = ({}) => {
  const [colorToInvert, setColorToInvert] = useState(getRandomHexColor());
  const invertedColor = useMemo(() => {
    try {
      return invertColor(colorToInvert);
    } catch (e) {
      return 'Invalid color format';
    }
  }, [colorToInvert]);

  return (
    <div>
      <h1>invertColor function</h1>
   
      <Row>
        <ColorBox color={colorToInvert} />
        
        <InputText 
          value={colorToInvert}
          onChange={(e) => setColorToInvert(e.target.value)}
        />

        <ColorBox color={invertedColor} />

        <Result>{invertedColor}</Result>
      </Row>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionInvertColorPage };