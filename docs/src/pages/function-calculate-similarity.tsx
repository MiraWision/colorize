import React, { useMemo, useState } from 'react';
import { calculateSimilarity, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-calculate-similarity';

import { InputText } from 'primereact/inputtext';
import { ColorBox, Result, Row } from '../components/styles';
import Markdown from '../components/common/markdown';

interface Props {}

const FunctionCalculateSimilarityPage: React.FC<Props> = ({}) => {
  const [color1, setColor1] = useState(randomColor());
  const [color2, setColor2] = useState(randomColor());
  
  const similarity = useMemo(() => {
    try {
      return calculateSimilarity(color1, color2).toFixed(2) + '%';
    } catch (e) {
      return 'Invalid color format';
    }
  }, [color1, color2]);

  return (
    <div>
      <h1>calculateSimilarity function</h1>

      <Row>
        <ColorBox color={color1} />
        
        <InputText 
          value={color1}
          onChange={(e) => setColor1(e.target.value)}
        />

        <ColorBox color={color2} />
        
        <InputText 
          value={color2}
          onChange={(e) => setColor2(e.target.value)}
        />

        <Result>{similarity}</Result>
      </Row>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionCalculateSimilarityPage };
