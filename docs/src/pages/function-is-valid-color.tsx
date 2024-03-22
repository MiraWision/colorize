import React, { useMemo, useState } from 'react';
import { ColorFormat, convertColor, isValidCMYKColor, isValidColor, isValidHEXAColor, isValidHEXColor, isValidHSLAColor, isValidHSLColor, isValidHSVColor, isValidRGBAColor, isValidRGBColor } from '@mirawision/colorize';

import { content } from '../content/function-is-valid-color';
import { getRandomHexColor } from '../utils/get-random-color';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

const colorFormats = [
  { name: 'Any', code: 'any' },
  { name: 'Hex', code: ColorFormat.HEX },
  { name: 'Hexa', code: ColorFormat.HEXA },
  { name: 'RGB', code: ColorFormat.RGB },
  { name: 'RGBA', code: ColorFormat.RGBA },
  { name: 'HSL', code: ColorFormat.HSL },
  { name: 'HSLA', code: ColorFormat.HSLA },
  { name: 'HSV', code: ColorFormat.HSV },
  { name: 'CMYK', code: ColorFormat.CMYK },
];

const FunctionIsValidColorPage: React.FC<Props> = ({}) => {
  const [colorToValidate, setColorToConvert] = useState(getRandomHexColor());
  const [colorFormatToValidate, setColorFormatToValidate] = useState<{ name: string; code: ColorFormat | 'any'}>({ name: 'Any', code: 'any' });
  const isValid = useMemo(() => {
    const validators = {
      'any': isValidColor,
      [ColorFormat.HEX]: isValidHEXColor,
      [ColorFormat.HEXA]: isValidHEXAColor,
      [ColorFormat.RGB]: isValidRGBColor,
      [ColorFormat.RGBA]: isValidRGBAColor,
      [ColorFormat.HSL]: isValidHSLColor,
      [ColorFormat.HSLA]: isValidHSLAColor,
      [ColorFormat.HSV]: isValidHSVColor,
      [ColorFormat.CMYK]: isValidCMYKColor,
    };

    return validators[colorFormatToValidate.code]?.(colorToValidate);
  }, [colorToValidate, colorFormatToValidate]);

  return (
    <div>
      <h1>isValidColor function & subfunctions</h1>
   
      <Row>
        <ColorBox color={colorToValidate} />
        
        <InputText 
          value={colorToValidate}
          onChange={(e) => setColorToConvert(e.target.value)}
        />

        <Dropdown 
          value={colorFormatToValidate}
          onChange={(e) => setColorFormatToValidate(e.value)}
          options={colorFormats}
          optionLabel='name'
          placeholder='Select Color Format'
          className='w-full md:w-14rem'
        />

        <Result>{isValid ? 'Valid Color' : 'Invalid Color'}</Result>
      </Row>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionIsValidColorPage };