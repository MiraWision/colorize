import React, { useMemo, useState } from 'react';
import { ColorFormat, extractOpacity, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-extract-opacity';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

const FunctionExtractOpacityPage: React.FC<Props> = ({}) => {
  const [colorToExtractOpacity, setColorToExtractOpacity] = useState(randomColor(ColorFormat.HEXA));

  const result = useMemo(() => {
    try {
      return extractOpacity(colorToExtractOpacity);
    } catch (e) {
      return 'Invalid color format';
    }
  }, [colorToExtractOpacity]);

  return (
    <div>
      <h1>extractOpacity function</h1>

      <Row>
        <ColorBox color={colorToExtractOpacity} />
        
        <InputText 
          value={colorToExtractOpacity}
          onChange={(e) => setColorToExtractOpacity(e.target.value)}
        />

        <ColorBox color={result !== 'Invalid color format' ? result.color : 'transparent'} />

        <Result>{result !== 'Invalid color format' ? `Color: ${result.color}, Opacity: ${Math.round(result.opacity * 100) / 100}` : 'Invalid color format'}</Result>
      </Row>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionExtractOpacityPage };