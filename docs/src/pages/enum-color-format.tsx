import React from 'react';

import { content } from '../content/enum-color-format';

import Markdown from '../components/common/markdown';

interface Props {
}

const EnumColorFormatPage: React.FC<Props> = ({}) => {
  return (
    <div>
      <h1>ColorFormat enum</h1>

      <Markdown markdownText={content} />
    </div>
  );
}

export { EnumColorFormatPage };