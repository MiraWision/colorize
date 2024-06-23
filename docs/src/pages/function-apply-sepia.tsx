import React, { useMemo, useState } from 'react';
import { applySepia, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-apply-sepia';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

const FunctionApplySepiaPage: React.FC<Props> = ({}) => {
  const [colorToApplySepia, setColorToApplySepia] = useState(randomColor());
  const sepiaColor = useMemo(() => {
    try {
      return applySepia(colorToApplySepia);
    } catch (e) {
      return 'Invalid color format';
    }
  }, [colorToApplySepia]);
  
  return (
    <div>
      <h1>applySepia function</h1>
   
      <Row>
        <ColorBox color={colorToApplySepia} />
        
        <InputText 
          value={colorToApplySepia}
          onChange={(e) => setColorToApplySepia(e.target.value)}
        />

        <ColorBox color={sepiaColor} />

        <Result>{sepiaColor}</Result>
      </Row>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionApplySepiaPage };