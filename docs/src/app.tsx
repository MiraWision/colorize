import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Routes } from './routes';

import { Logo } from './components/common/logo';
import { MenuList } from './components/menu/menu-list';
import { IntroductionPage } from './pages/introduction';
import { FunctionGetColorFormatPage } from './pages/function-get-color-format';
import { FunctionConvertColorPage } from './pages/function-convert-color';
import { FunctionIsValidColorPage } from './pages/function-is-valid-color';
import { FunctionGenerateSteppedGradientPage } from './pages/function-generate-stepped-gradient';
import { FunctionBlendColorsPage } from './pages/function-blend-colors';
import { FunctionAdjustBrightnessPage } from './pages/function-adjust-brightness';
import { FunctionAdjustSaturationPage } from './pages/function-adjust-saturation';
import { FunctionInvertColorPage } from './pages/function-invert-color';
import { FunctionApplySepiaPage } from './pages/function-apply-sepia';
import { FunctionChangeOpacityPage } from './pages/function-change-opacity';
import { EnumColorFormatPage } from './pages/enum-color-format';

const App: React.FC = () => (
  <Router>
    <Container>
      <Sidebar>
        <Logo />
        <MenuList />
        <GitHubLogo href='https://github.com/MiraWision/colorize' target='_blank'>
          <img src='./assets/icons/github.svg' alt='github' />
        </GitHubLogo>
        <NPMLogo href='https://www.npmjs.com/package/@mirawision/colorize' target='_blank'>
          <img src='./assets/icons/npm.png' alt='npm' />
        </NPMLogo>
      </Sidebar>
      <Content>
        <Switch>
          <Redirect exact from='/' to={Routes.Introduction} />
          <Redirect exact from='/colorize' to={Routes.Introduction} />
          <Redirect exact from='/colorize/' to={Routes.Introduction} />
          <Route path={Routes.Introduction} component={IntroductionPage} />
          <Route path={Routes.FunctionConvertColor} component={FunctionConvertColorPage} />
          <Route path={Routes.FunctionGetColorFormat} component={FunctionGetColorFormatPage} />
          <Route path={Routes.FunctionIsValidColor} component={FunctionIsValidColorPage} />
          <Route path={Routes.FunctionGenerateSteppedGradient} component={FunctionGenerateSteppedGradientPage} />
          <Route path={Routes.FunctionBlendColors} component={FunctionBlendColorsPage} />
          <Route path={Routes.FunctionAdjustBrightness} component={FunctionAdjustBrightnessPage} />
          <Route path={Routes.FunctionAdjustSaturation} component={FunctionAdjustSaturationPage} />
          <Route path={Routes.FunctionInvertColor} component={FunctionInvertColorPage} />
          <Route path={Routes.FunctionApplySepia} component={FunctionApplySepiaPage} />
          <Route path={Routes.FunctionChangeOpacity} component={FunctionChangeOpacityPage} />
          <Route path={Routes.FunctionChangeOpacity} component={FunctionChangeOpacityPage} />
          <Route path={Routes.EnumColorFormat} component={EnumColorFormatPage} />
        </Switch>
      </Content>
    </Container>
  </Router>
);

const Container = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 240px calc(100vw - 240px);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  min-height: 600px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative; 
`;

const Content = styled.div`
  padding: 24px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 750px;
  margin: auto;
`;

const BaseLogo = styled.a`
  position: fixed;
  bottom: 16px;
  left: 16px;
  width: 24px;
  height: 24px;
  transition: transform 0.5s;

  img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    transform: scale(1.35);
  }
`;

const GitHubLogo = styled(BaseLogo)`
  left: 16px;
`;

const NPMLogo = styled(BaseLogo)`
  left: 56px;
`;

export default App;
