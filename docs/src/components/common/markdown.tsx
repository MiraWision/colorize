import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { styled } from 'styled-components';
import * as marked from 'marked';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { CopyButton } from './copy-button';

const renderer = new marked.Renderer();

renderer.code = (code, language) => {
  console.error('CODE', language);
  return `<div class="code-block" data-language="${language}" data-code="${encodeURIComponent(code)}"></div>`;
};

interface Props {
  markdownText: string;
}

const Markdown: React.FC<Props> = ({ markdownText }) => {
  useEffect(() => {
    document.querySelectorAll('.code-block').forEach((block) => {
      const language = block.getAttribute('data-language');
      const code = decodeURIComponent(block.getAttribute('data-code'));

      ReactDOM.render(
        <CodeContainer>
          <SyntaxHighlighter style={materialOceanic} language={language}>
            {code}
          </SyntaxHighlighter>
          <CopyButtonStyled text={code} />
        </CodeContainer>,
        block
      );
    });
  }, [markdownText]);

  const html = marked.parse(markdownText, { renderer });

  return <Container dangerouslySetInnerHTML={{ __html: html }} />;
};

const Container = styled.div`
  color: var(--surface-600);

  p, li {
    line-height: 1.6;
  }

  pre {
    border-radius: 8px;
  }
`;

const CopyButtonStyled = styled(CopyButton)`
  position: absolute;
  top: 8px;
  right: 8px;
  transition: opacity 0.2s;
`;

const CodeContainer = styled.div`
  position: relative;

  ${CopyButtonStyled} {
    opacity: 0;
  }

  &:hover {
    ${CopyButtonStyled} {
      opacity: 1;
    }
  }
`;

export default Markdown;
