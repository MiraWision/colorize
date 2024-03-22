import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { ColorFormat, convertColor } from '@mirawision/colorize';

import { content } from '../content/function-convert-color';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
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
  const [colorToConvert, setColorToConvert] = useState('#963246');
  const [colorFormatToConvert, setColorFormatToConvert] = useState<ColorFormat>(ColorFormat.RGB);
  const convertedColor = useMemo(() => {
    try {
      return convertColor(colorToConvert, colorFormatToConvert);
    } catch (e) {
      return 'Invalid color format';
    }
  }, [colorToConvert, colorFormatToConvert]);

  return (
    <div>
      FunctionConvertColorPage
    
      <Row>
        <ColorBox color={colorToConvert} />
        
        <InputText 
          value={colorToConvert}
          onChange={(e) => setColorToConvert(e.target.value)}
        />

        <Dropdown 
          value={colorFormatToConvert}
          onChange={(e) => setColorFormatToConvert(e.value.code)}
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