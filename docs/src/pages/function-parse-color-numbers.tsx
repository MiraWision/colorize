import React, { useMemo, useState } from 'react';
import { ColorFormat, parseColorNumbers } from '@mirawision/colorize';

import { content } from '../content/function-parse-color-numbers';
import { getRandomRgbaColor } from '../utils/get-random-color';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

interface ColorFormatItem { 
  name: string; 
  code: ColorFormat.RGB | ColorFormat.RGBA | ColorFormat.HSL | ColorFormat.HSLA;
}

const colorFormats: ColorFormatItem[] = [
  { name: 'RGB', code: ColorFormat.RGB },
  { name: 'RGBA', code: ColorFormat.RGBA },
  { name: 'HSL', code: ColorFormat.HSL },
  { name: 'HSLA', code: ColorFormat.HSLA },
];

const FunctionParseColorNumbersPage: React.FC<Props> = ({}) => {
  const [colorToParseNumbers, setColorToParseNumbers] = useState(getRandomRgbaColor());
  const [colorFormatToParse, setColorFormatToParse] = useState<ColorFormatItem>(colorFormats[0]);
  const result = useMemo(() => {
    try {
      return parseColorNumbers(colorToParseNumbers, colorFormatToParse.code);
    } catch (e) {
      return 'Invalid color format';
    }
  }, [colorToParseNumbers, colorFormatToParse]);

  return (
    <div>
      <h1>parseColorNumbers function</h1>

      <Row>
        <ColorBox color={colorToParseNumbers} />
        
        <InputText 
          value={colorToParseNumbers}
          onChange={(e) => setColorToParseNumbers(e.target.value)}
        />

        <Dropdown 
          value={colorFormatToParse}
          onChange={(e) => setColorFormatToParse(e.value)}
          options={colorFormats}
          optionLabel='name'
          placeholder='Select Color Format'
          className='w-full md:w-14rem'
        />

        <Result>
          {result !== 'Invalid color format' 
            ? Object.entries(result).map(([key, value]) => `${key}: ${value}`).join(', ') 
            : 'Invalid color format'}
        </Result>
      </Row>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionParseColorNumbersPage };