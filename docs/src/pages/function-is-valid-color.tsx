import React from 'react';
import styled from 'styled-components';

import { content } from '../content/function-is-valid-color';

import Markdown from '../components/common/markdown';

interface Props {
}

const FunctionIsValidColorPage: React.FC<Props> = ({}) => {
  return (
    <div>
      FunctionIsValidColorPage
   
      <Markdown markdownText={content} />
    </div>
  );
}

export { FunctionIsValidColorPage };