import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { blendColors } from '@mirawision/colorize';

import { content } from '../content/function-blend-colors';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ColorBox, Result, Row } from '../components/styles';

interface Props {
}

const FunctionBlendColorsPage: React.FC<Props> = ({}) => {
  const [baseColorForBlend, setBaseColorForBlend] = useState('#ABCDEF');
  const [blendColor, setBlendColor] = useState('#FFFFFF');
  const [blendFactor, setBlendFactor] = useState(0.5);

  const blendedColor = useMemo(() => {
    try {
      return blendColors(baseColorForBlend, blendColor, blendFactor);
    } catch (e) {
      return 'Invalid color format';
    }
  }, [baseColorForBlend, blendColor, blendFactor]);

  return (
    <div>
      FunctionBlendColorsPage

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

        <InputNumber
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

export { FunctionBlendColorsPage };