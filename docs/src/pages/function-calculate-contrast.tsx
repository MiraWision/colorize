import React, { useMemo, useState } from 'react';
import { calculateContrast, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-calculate-contrast';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { ColorBox, FlexibleContainer, Result, Row } from '../components/styles';

interface Props {
}

const FunctionCalculateContrastPage: React.FC<Props> = ({}) => {
  const [colorToCalculateContrast1, setColorToCalculateContrast1] = useState(randomColor());
  const [colorToCalculateContrast2, setColorToCalculateContrast2] = useState(randomColor());
  const contrast = useMemo(() => {
    try {
      return Math.round(calculateContrast(colorToCalculateContrast1, colorToCalculateContrast2) * 100) / 100;
    } catch (e) {
      return 'Invalid color format';
    }
  }, [colorToCalculateContrast1, colorToCalculateContrast2]);

  return (
    <div>
      <h1>calculateContrast function</h1>

      <FlexibleContainer>
        <Row>
          <ColorBox color={colorToCalculateContrast1} />
          
          <InputText 
            value={colorToCalculateContrast1}
            onChange={(e) => setColorToCalculateContrast1(e.target.value)}
          />
        </Row>

        <Row>
          <ColorBox color={colorToCalculateContrast2} />
          
          <InputText 
            value={colorToCalculateContrast2}
            onChange={(e) => setColorToCalculateContrast2(e.target.value)}
          />
        </Row>

        <Result>{contrast}</Result>
      </FlexibleContainer>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionCalculateContrastPage };