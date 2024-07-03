import React, { useState } from 'react';
import { randomColor, ColorFormat } from '@mirawision/colorize';

import { content } from '../content/function-random-color';

import Markdown from '../components/common/markdown';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { ColorBox, FlexibleContainer, Result, Row } from '../components/styles';

interface Props {}

const colorFormats = [
  { label: 'HEX', value: ColorFormat.HEX },
  { label: 'HEXA', value: ColorFormat.HEXA },
  { label: 'RGB', value: ColorFormat.RGB },
  { label: 'RGBA', value: ColorFormat.RGBA },
  { label: 'HSL', value: ColorFormat.HSL },
  { label: 'HSLA', value: ColorFormat.HSLA },
  { label: 'HSV', value: ColorFormat.HSV },
  { label: 'CMYK', value: ColorFormat.CMYK },
];

const FunctionRandomColorPage: React.FC<Props> = ({}) => {
  const [selectedFormat, setSelectedFormat] = useState(ColorFormat.HEX);

  const [randomColorValue, setRandomColorValue] = useState(randomColor(selectedFormat));

  const generateRandomColor = () => {
    setRandomColorValue(randomColor(selectedFormat));
  };

  return (
    <div>
      <h1>randomColor function</h1>

      <FlexibleContainer>
        <Dropdown 
          value={selectedFormat} 
          options={colorFormats} 
          onChange={(e) => setSelectedFormat(e.value)} 
          placeholder="Select a Color Format" 
        />

        <Button onClick={generateRandomColor}>Generate</Button>

        <Row>
          <ColorBox color={randomColorValue} />

          <Result>{randomColorValue}</Result>
        </Row>
      </FlexibleContainer>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionRandomColorPage };
