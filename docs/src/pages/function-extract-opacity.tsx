import React, { useMemo, useState } from 'react';
import { ColorFormat, extractOpacity, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-extract-opacity';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { ColorBox, FlexibleContainer, Result, Row } from '../components/styles';

interface Props {
}

const FunctionExtractOpacityPage: React.FC<Props> = ({}) => {
  const [colorToExtractOpacity, setColorToExtractOpacity] = useState(randomColor(ColorFormat.HEXA));

  const result = useMemo(() => {
    return extractOpacity(colorToExtractOpacity);
  }, [colorToExtractOpacity]);

  return (
    <div>
      <h1>extractOpacity function</h1>

      <FlexibleContainer>
        <Row>
          <ColorBox color={colorToExtractOpacity} />
          
          <InputText 
            value={colorToExtractOpacity}
            onChange={(e) => setColorToExtractOpacity(e.target.value)}
          />
        </Row>

        <Row>
          <ColorBox color={result.color} />

          <Result>{`Color: ${result.color}, Opacity: ${Math.round(result.opacity * 100) / 100}`}</Result>
        </Row>
      </FlexibleContainer>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionExtractOpacityPage };