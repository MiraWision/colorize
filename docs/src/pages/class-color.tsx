import React from 'react';

import { content } from '../content/class-color';

import Markdown from '../components/common/markdown';

interface Props {
}

const ClassColorPage: React.FC<Props> = ({}) => {
  return (
    <div>
      <h1>Color color</h1>

      <Markdown markdownText={content} />
    </div>
  );
}

export { ClassColorPage };