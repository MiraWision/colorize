import React, { useMemo, useState } from 'react';
import { invertColor, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-invert-color';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { ColorBox, FlexibleContainer, Result, Row } from '../components/styles';

interface Props {
}

const FunctionInvertColorPage: React.FC<Props> = ({}) => {
  const [colorToInvert, setColorToInvert] = useState(randomColor());
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
   
      <FlexibleContainer>
        <Row>
          <ColorBox color={colorToInvert} />
          
          <InputText 
            value={colorToInvert}
            onChange={(e) => setColorToInvert(e.target.value)}
          />
        </Row>

        <Row>
          <ColorBox color={invertedColor} />

          <Result>{invertedColor}</Result>
        </Row>
      </FlexibleContainer>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionInvertColorPage };