import React, { useMemo, useState } from 'react';
import { getLuminance, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-get-luminance';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

const FunctionGetLuminancePage: React.FC<Props> = ({}) => {
  const [colorToCalculate, setColorToCalculate] = useState(randomColor());
  const luminance = useMemo(() => {
    try {
      return Math.round(getLuminance(colorToCalculate) * 10000) / 10000;
    } catch (e) {
      return 'Invalid color format';
    }
  }, [colorToCalculate]);

  return (
    <div>
      <h1>getLuminance function</h1>

      <Row>
        <ColorBox color={colorToCalculate} />

        <InputText 
          value={colorToCalculate}
          onChange={(e) => setColorToCalculate(e.target.value)}
        />

        <Result>{luminance}</Result>
      </Row>
      
      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionGetLuminancePage };