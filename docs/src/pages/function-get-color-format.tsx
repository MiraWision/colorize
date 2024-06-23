import React, { useMemo, useState } from 'react';
import { getColorFormat, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-get-color-format';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

const FunctionGetColorFormatPage: React.FC<Props> = ({}) => {
  const [colorToValidate, setColorToValidate] = useState(randomColor());
  const validatedColorFormat = useMemo(() => {
    return getColorFormat(colorToValidate) ?? 'Invalid color format';
  }, [colorToValidate]);

  return (
    <div>
      <h1>getColorFormat function</h1>

      <Row>
        <ColorBox color={colorToValidate} />

        <InputText 
          value={colorToValidate}
          onChange={(e) => setColorToValidate(e.target.value)}
        />

        <Result>{validatedColorFormat}</Result>
      </Row>
      
      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionGetColorFormatPage };