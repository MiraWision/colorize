import React, { useMemo, useState } from 'react';
import { getTemperature, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-get-temperature';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

const FunctionGetTemperaturePage: React.FC<Props> = ({}) => {
  const [colorToGetTemperature, setColorToGetTemperature] = useState(randomColor());
  const temperature = useMemo(() => {
    return Math.round(getTemperature(colorToGetTemperature));
  }, [colorToGetTemperature]);

  return (
    <div>
      <h1>getTemperature function</h1>

      <Row>
        <ColorBox color={colorToGetTemperature} />

        <InputText 
          value={colorToGetTemperature}
          onChange={(e) => setColorToGetTemperature(e.target.value)}
        />

        <Result>{`${temperature}K`}</Result>
      </Row>
      
      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionGetTemperaturePage };
