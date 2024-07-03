import React, { useMemo, useState } from 'react';
import { oppositeColor, randomColor } from '@mirawision/colorize';

import { content } from '../content/function-opposite-color';

import Markdown from '../components/common/markdown';
import { InputText } from 'primereact/inputtext';
import { ColorBox, FlexibleContainer, Result, Row } from '../components/styles';

interface Props {}

const FunctionOppositeColorPage: React.FC<Props> = ({}) => {
  const [colorToFindOpposite, setColorToFindOpposite] = useState(randomColor());
  
  const oppositeColorValue = useMemo(() => {
    try {
      return oppositeColor(colorToFindOpposite);
    } catch (e) {
      return 'Invalid color format';
    }
  }, [colorToFindOpposite]);

  return (
    <div>
      <h1>oppositeColor function</h1>

      <FlexibleContainer>
        <Row>
          <ColorBox color={colorToFindOpposite} />
          
          <InputText 
            value={colorToFindOpposite}
            onChange={(e) => setColorToFindOpposite(e.target.value)}
          />
        </Row>

        <Row>
          <ColorBox color={oppositeColorValue} />

          <Result>{oppositeColorValue}</Result>
        </Row>
      </FlexibleContainer>

      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionOppositeColorPage };
