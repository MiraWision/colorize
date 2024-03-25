import React, { useMemo, useState } from 'react';
import { isDark } from '@mirawision/colorize';

import { content } from '../content/function-is-dark';
import { getRandomHexColor } from '../utils/get-random-color';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

const FunctionIsDarkPage: React.FC<Props> = ({}) => {
  const [colorToCalculate, setColorToCalculate] = useState(getRandomHexColor());
  const results = useMemo(() => {
    try {
      return isDark(colorToCalculate);
    } catch (e) {
      return 'Invalid color format';
    }
  }, [colorToCalculate]);

  return (
    <div>
      <h1>isDark function</h1>
   
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

export { FunctionIsDarkPage };