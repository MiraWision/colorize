import React from 'react';
import styled, { css } from 'styled-components';

interface Props {
}

const MenuItems = [
  {
    name: 'Introduction',
    url: '/',
  },
  {
    name: 'Methods',
    url: '/methods',
    subitems: [
      {
        name: 'getColorFormat',
        url: '/methods/getColorFormat',
      },
    ]
  },
];

const MenuList: React.FC<Props> = ({}) => {
  const pathname = '';

  return (
    <Container>
      {MenuItems.map((item) => (
        <>
          <MenuItem 
            key={item.url} 
            href={item.url}
            active={item.url === pathname}
          >
            {item.name}
          </MenuItem>
          {item.subitems?.map((subitem) => (
            <MenuItem 
              key={subitem.url} 
              href={subitem.url}
              active={subitem.url === pathname}
              subitem
            >
              {subitem.name}
            </MenuItem>
          ))}
        </>
      ))}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 24px;
`;

const MenuItem = styled.a<{ active: boolean, subitem?: boolean }>`
  border-left: 1px solid var(--surface-border);
  font-weight: 450;
  display: flex;
  padding: 8px;
  color: var(--surface-700);
  transition: all .2s;
  text-decoration: none;
  font-family: "Rajdhani", sans-serif;

  &:hover {
    color: var(--surface-900);
    border-left-color: var(--surface-500);
  }

  ${({ active }) => active && css`
    color: var(--primary-color);
    border-left-color: var(--primary-color);

    &:hover {
      color: var(--primary-color);
      border-left-color: var(--primary-color);
    }
  `}

  ${({ subitem }) => subitem && css`
    padding-left: 24px;
  `}

  div {
    margin-left: 4px;
  }
`;

export { MenuList };