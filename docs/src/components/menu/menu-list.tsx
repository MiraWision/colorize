import React from 'react';
import styled, { css } from 'styled-components';
import { useLocation, Link } from 'react-router-dom';

import { Routes } from '../../routes';

interface Props {
}

const MenuItems = [
  {
    name: 'Introduction',
    url: Routes.Introduction,
  },
  {
    name: 'API Reference',
    url: '#',
    subitems: [
      {
        name: 'Validation & Detection',
        isGroup: true,
      },
      {
        name: 'isValidColor',
        url: Routes.FunctionIsValidColor,
      },
      {
        name: 'getColorFormat',
        url: Routes.FunctionGetColorFormat,
      },
      {
        name: 'Conversion',
        isGroup: true,
      },
      {
        name: 'convertColor',
        url: Routes.FunctionConvertColor,
      },
      {
        name: 'extractOpacity',
        url: Routes.FunctionExtractOpacity,
      },
      {
        name: 'parseColorNumbers',
        url: Routes.FunctionParseColorNumbers,
      },
      {
        name: 'Gradients',
        isGroup: true,
      },
      {
        name: 'generateSteppedGradient',
        url: Routes.FunctionGenerateSteppedGradient,
      },
      {
        name: 'generateMultiSteppedGradient',
        url: Routes.FunctionGenerateMultiSteppedGradient,
      },
      {
        name: 'Manipulations',
        isGroup: true,
      },
      {
        name: 'blendColors',
        url: Routes.FunctionBlendColors,
      },
      {
        name: 'tint',
        url: Routes.FunctionTint,
      },
      {
        name: 'shade',
        url: Routes.FunctionShade,
      },
      {
        name: 'adjustBrightness',
        url: Routes.FunctionAdjustBrightness,
      },
      {
        name: 'adjustSaturation',
        url: Routes.FunctionAdjustSaturation,
      },
      {
        name: 'invertColor',
        url: Routes.FunctionInvertColor,
      },
      {
        name: 'applySepia',
        url: Routes.FunctionApplySepia,
      },
      {
        name: 'applyGreyscale',
        url: Routes.FunctionApplyGreyscale,
      },
      {
        name: 'changeOpacity',
        url: Routes.FunctionChangeOpacity,
      },
      {
        name: 'Analysis',
        isGroup: true,
      },
      {
        name: 'getLuminance',
        url: Routes.FunctionGetLuminance,
      },
      {
        name: 'isLight',
        url: Routes.FunctionIsLight,
      },
      {
        name: 'isDark',
        url: Routes.FunctionIsDark,
      },
      {
        name: 'calculateContrast',
        url: Routes.FunctionCalculateContrast,
      },
      {
        name: 'Types',
        isGroup: true,
      },
      {
        name: 'ColorFormat',
        url: Routes.EnumColorFormat,
      },
    ],
  },
];

const MenuList: React.FC<Props> = ({}) => {
  const location = useLocation();

  return (
    <Container>
      {MenuItems.map((item) => (
        <React.Fragment key={item.url}>
          <MenuItem 
            to={item.url}
            isActive={item.url === location?.pathname}
            isInactive={item.url === '#'}
          >
            {item.name}
          </MenuItem>
          {item.subitems?.map((subitem) => subitem.isGroup 
            ? (
              <MenuGroup>
                {subitem.name}
              </MenuGroup>
            )
            : (
              <MenuItem 
                key={subitem.url} 
                to={subitem.url}
                isActive={subitem.url === location?.pathname}
                isSubitem
              >
                {subitem.name}
              </MenuItem>
            ))}
        </React.Fragment>
      ))}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 24px;
`;

const MenuItem = styled(Link)<{ isActive: boolean, isInactive?: boolean, isSubitem?: boolean }>`
  border-left: 1px solid var(--surface-border);
  font-weight: 400;
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

  ${({ isActive }) => isActive && css`
    color: var(--primary-color);
    border-left-color: var(--primary-color);

    &:hover {
      color: var(--primary-color);
      border-left-color: var(--primary-color);
    }
  `}

  ${({ isSubitem }) => isSubitem && css`
    padding-left: 24px;
  `}

  ${({ isInactive }) => isInactive && css`
    cursor: default;

    &:hover {
      border-left-color: var(--surface-border);
    }
  `}

  div {
    margin-left: 4px;
  }
`;

const MenuGroup = styled.div`
  padding: 12px 16px 4px;
  font-weight: 400;
  font-size: 12px;
  font-family: "Rajdhani", sans-serif;
  text-transform: uppercase;
`;

export { MenuList };