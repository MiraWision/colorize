import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { applySepia } from '@mirawision/colorize';

import { content } from '../content/function-apply-sepia';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

const FunctionApplySepiaPage: React.FC<Props> = ({}) => {
  const [colorToApplySepia, setColorToApplySepia] = useState('#ABCDEF');
  const sepiaColor = useMemo(() => {
    try {
      return applySepia(colorToApplySepia);
    } catch (e) {
      return 'Invalid color format';
    }
  }, [colorToApplySepia]);
  
  return (
    <div>
      FunctionApplySepiaPage
   
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