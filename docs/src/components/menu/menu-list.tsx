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
    name: 'Functions',
    url: '/functions',
    inactive: true,
    subitems: [
      {
        name: 'convertColor',
        url: '/functions/convertColor',
      },
      {
        name: 'getColorFormat',
        url: '/functions/getColorFormat',
      },
      {
        name: 'isValidColor & others',
        url: '/functions/isValidColor',
      },
      {
        name: 'generateSteppedGradient',
        url: '/functions/generateSteppedGradient',
      },
      {
        name: 'blendColors',
        url: '/functions/blendColors',
      },
      {
        name: 'adjustBrightness',
        url: '/functions/adjustBrightness',
      },
      {
        name: 'adjustSaturation',
        url: '/functions/adjustSaturation',
      },
      {
        name: 'invertColor',
        url: '/functions/invertColor',
      },
      {
        name: 'applySepia',
        url: '/functions/applySepia',
      },
      {
        name: 'changeOpacity',
        url: '/functions/changeOpacity',
      },
    ],
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
            href={item.inactive ? undefined : item.url}
            active={item.url === pathname}
            inactive={item.inactive}
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

const MenuItem = styled.a<{ active: boolean, inactive?: boolean, subitem?: boolean }>`
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

  ${({ inactive }) => inactive && css`
    cursor: default;

    &:hover {
      border-left-color: var(--surface-border);
    }
  `}

  div {
    margin-left: 4px;
  }
`;

export { MenuList };