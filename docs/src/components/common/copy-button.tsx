import React, { useState } from 'react';
import styled from 'styled-components';

import { Button } from 'primereact/button';

interface Props {
  text: string;
  className?: string;
}

const CopyButton: React.FC<Props> = ({ text, className }) => {
  const [icon, setIcon] = useState('pi pi-copy');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);

      setIcon('pi pi-check');

      setTimeout(() => {
        setIcon('pi pi-copy');
      }, 3000);
    } catch (err) {
    }
  };

  return (
    <ButtonSmall 
      className={className} 
      icon={icon} 
      onClick={copyToClipboard} 
      text
    />
  );
};

const ButtonSmall = styled(Button)`
  border-radius: 4px;
  height: 30px;
  width: 30px;
  
  &:focus {
    box-shadow: none;
  }
`;

export { CopyButton };
