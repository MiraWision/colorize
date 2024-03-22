import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import * as marked from 'marked';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { CopyButton } from './copy-button';

const renderer = new marked.Renderer();

renderer.code = (code, language) => {
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

      const root = createRoot(block);

      root.render(
        <CodeContainer>
          <SyntaxHighlighter style={materialOceanic} language={language}>
            {code}
          </SyntaxHighlighter>
          <CopyButtonStyled text={code} />
        </CodeContainer>
      );
    });
  }, [markdownText]);

  const html = marked.parse(markdownText, { renderer });

  return <Container dangerouslySetInnerHTML={{ __html: html }} />;
};

const Container = styled.div`
  pre {
    max-width: 700px;
    border-radius: 8px;
  }

  a {
    text-decoration: none;
    color: var(--primary-color);

    &:hover {
      text-decoration: underline;
    }
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
