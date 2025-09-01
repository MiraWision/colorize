import React, { useMemo, useState } from 'react';
import { ColorFormat, parseColorNumbers, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-parse-color-numbers';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { ColorBox, FlexibleContainer, Result, Row } from '../components/styles';

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
  const [colorToParseNumbers, setColorToParseNumbers] = useState(randomColor(ColorFormat.RGBA));

  const [colorFormatToParse, setColorFormatToParse] = useState<ColorFormatItem>(colorFormats[0]);
  
  const result = useMemo(() => {
    return parseColorNumbers(colorToParseNumbers, colorFormatToParse.code);
  }, [colorToParseNumbers, colorFormatToParse]);

  return (
    <div>
      <h1>parseColorNumbers function</h1>

      <FlexibleContainer>
        <Row>
          <ColorBox color={colorToParseNumbers} />
          
          <InputText 
            value={colorToParseNumbers}
            onChange={(e) => setColorToParseNumbers(e.target.value)}
          />
        </Row>

        <Dropdown 
          value={colorFormatToParse}
          onChange={(e) => setColorFormatToParse(e.value)}
          options={colorFormats}
          optionLabel='name'
          placeholder='Select Color Format'
          className='w-full md:w-14rem'
        />

        <Result>
          {Object.entries(result).map(([key, value]) => `${key}: ${value}`).join(', ')}
        </Result>
      </FlexibleContainer>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionParseColorNumbersPage };