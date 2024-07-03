import React, { useMemo, useState } from 'react';
import { applyGreyscale, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-apply-greyscale';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { ColorBox, FlexibleContainer, Result, Row } from '../components/styles';

interface Props {
}

const FunctionApplyGreyscalePage: React.FC<Props> = ({}) => {
  const [colorToApplyGreyscale, setColorToApplyGreyscale] = useState(randomColor());
  const greyscaleColor = useMemo(() => {
    try {
      return applyGreyscale(colorToApplyGreyscale);
    } catch (e) {
      return 'Invalid color format';
    }
  }, [colorToApplyGreyscale]);
  
  return (
    <div>
      <h1>applyGreyscale function</h1>
   
      <FlexibleContainer>
        <Row>
          <ColorBox color={colorToApplyGreyscale} />
          
          <InputText 
            value={colorToApplyGreyscale}
            onChange={(e) => setColorToApplyGreyscale(e.target.value)}
          />
        </Row>

        <Row>
          <ColorBox color={greyscaleColor} />

          <Result>{greyscaleColor}</Result>
        </Row>
      </FlexibleContainer>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionApplyGreyscalePage };