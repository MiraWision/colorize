import React, { useMemo, useState } from 'react';
import { isLight, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-is-light';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

const FunctionIsLightPage: React.FC<Props> = ({}) => {
  const [colorToCalculate, setColorToCalculate] = useState(randomColor());
  const results = useMemo(() => {
    try {
      return isLight(colorToCalculate);
    } catch (e) {
      return 'Invalid color format';
    }
  }, [colorToCalculate]);

  return (
    <div>
      <h1>isLight function</h1>
   
      <Row>
        <ColorBox color={colorToCalculate} />

        <InputText 
          value={colorToCalculate}
          onChange={(e) => setColorToCalculate(e.target.value)}
        />

        <Result>{results.toString()}</Result>
      </Row>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionIsLightPage };