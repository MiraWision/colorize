import React, { useMemo, useState } from 'react';
import { ColorFormat, convertColor } from '@mirawision/colorize';

import { getRandomHexColor } from '../utils/get-random-color';
import { content } from '../content/function-convert-color';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

const colorFormats = [
  { name: 'Hex', code: ColorFormat.HEX },
  { name: 'Hexa', code: ColorFormat.HEXA },
  { name: 'RGB', code: ColorFormat.RGB },
  { name: 'RGBA', code: ColorFormat.RGBA },
  { name: 'HSL', code: ColorFormat.HSL },
  { name: 'HSLA', code: ColorFormat.HSLA },
  { name: 'HSV', code: ColorFormat.HSV },
  { name: 'CMYK', code: ColorFormat.CMYK },
];

const FunctionConvertColorPage: React.FC<Props> = ({}) => {
  const [colorToConvert, setColorToConvert] = useState(getRandomHexColor());
  const [colorFormatToConvert, setColorFormatToConvert] = useState<{ name: string; code: ColorFormat}>({ name: 'RGB', code: ColorFormat.RGB });
  const convertedColor = useMemo(() => {
    try {
      return convertColor(colorToConvert, colorFormatToConvert.code);
    } catch (e) {
      return 'Invalid color format';
    }
  }, [colorToConvert, colorFormatToConvert]);

  return (
    <div>
      <h1>convertColor function</h1>
    
      <Row>
        <ColorBox color={colorToConvert} />
        
        <InputText 
          value={colorToConvert}
          onChange={(e) => setColorToConvert(e.target.value)}
        />

        <Dropdown 
          value={colorFormatToConvert}
          onChange={(e) => setColorFormatToConvert(e.value)}
          options={colorFormats}
          optionLabel='name'
          placeholder='Select Color Format'
          className='w-full md:w-14rem'
        />

        <ColorBox color={convertedColor} />

        <Result>{convertedColor}</Result>
      </Row>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionConvertColorPage };