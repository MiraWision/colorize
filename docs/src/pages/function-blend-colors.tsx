import React, { useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { blendColors } from '@mirawision/colorize';

import { content } from '../content/function-blend-colors';
import { getRandomHexColor } from '../utils/get-random-color';
import { getRandomNumber } from '../utils/get-random-numer';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

const FunctionBlendColorsPage: React.FC<Props> = ({}) => {
  const [baseColorForBlend, setBaseColorForBlend] = useState(getRandomHexColor());
  const [blendColor, setBlendColor] = useState(getRandomHexColor());
  const [blendFactor, setBlendFactor] = useState(getRandomNumber(0.05, 0.95, 0.05));

  const blendedColor = useMemo(() => {
    try {
      return blendColors(baseColorForBlend, blendColor, blendFactor);
    } catch (e) {
      return 'Invalid color format';
    }
  }, [baseColorForBlend, blendColor, blendFactor]);

  return (
    <div>
      <h1>blendColors function</h1>

      <Row>
        <ColorBox color={baseColorForBlend} />
        
        <InputText 
          value={baseColorForBlend}
          onChange={(e) => setBaseColorForBlend(e.target.value)}
        />

        <ColorBox color={blendColor} />
        
        <InputText 
          value={blendColor}
          onChange={(e) => setBlendColor(e.target.value)}
        />

        <InputNumberMini
          min={0}
          max={1}
          step={0.1}
          value={blendFactor}
          showButtons
          onChange={(e) => setBlendFactor(Number(e.value))}
        />

        <ColorBox color={blendedColor} />

        <Result>{blendedColor}</Result>
      </Row>

      <Markdown markdownText={content} />
    </div>
  );
}

const InputNumberMini = styled(InputNumber)`
  input {
    width: 75px;
  }
`;

export { FunctionBlendColorsPage };