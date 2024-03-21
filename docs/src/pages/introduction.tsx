import React from 'react';
import styled from 'styled-components';

import Markdown from '../components/common/markdown';

import { content } from '../content/introduction';

interface Props {
}

const IntroductionPage: React.FC<Props> = ({}) => {
  return (
    <div>
      <Markdown markdownText={content} />
    </div>
  );
}

export { IntroductionPage };