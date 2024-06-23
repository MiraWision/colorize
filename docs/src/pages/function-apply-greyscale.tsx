import React, { useMemo, useState } from 'react';
import { applyGreyscale, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-apply-greyscale';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { ColorBox, Result, Row } from '../components/styles';

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
   
      <Row>
        <ColorBox color={colorToApplyGreyscale} />
        
        <InputText 
          value={colorToApplyGreyscale}
          onChange={(e) => setColorToApplyGreyscale(e.target.value)}
        />

        <ColorBox color={greyscaleColor} />

        <Result>{greyscaleColor}</Result>
      </Row>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionApplyGreyscalePage };