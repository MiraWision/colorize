import React from 'react';
import styled from 'styled-components';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

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
import { FunctionExtractOpacityPage } from './pages/function-extract-opacity';
import { FunctionParseColorNumbersPage } from './pages/function-parse-color-numbers';
import { FunctionGenerateMultiSteppedGradientPage } from './pages/function-generate-multi-stepped-gradient';
import { FunctionTintPage } from './pages/function-tint';
import { FunctionShadePage } from './pages/function-shade';
import { FunctionGetLuminancePage } from './pages/function-get-luminance';
import { FunctionIsLightPage } from './pages/function-is-light';
import { FunctionIsDarkPage } from './pages/function-is-dark';
import { FunctionCalculateContrastPage } from './pages/function-calculate-contrast';

const App: React.FC = () => (
  <Router>
    <Container>
      <Sidebar>
        <Logo />
        <MenuList />
      </Sidebar>
      <Content>
        <GitHubLogo href='https://github.com/MiraWision/colorize' target='_blank'>
          <img src='./assets/icons/github.svg' alt='github' />
        </GitHubLogo>
        <NPMLogo href='https://www.npmjs.com/package/@mirawision/colorize' target='_blank'>
          <img src='./assets/icons/npm.png' alt='npm' />
        </NPMLogo>
        <Switch>
          <Redirect exact from='/' to={Routes.Introduction} />
          <Redirect exact from='/colorize' to={Routes.Introduction} />
          <Redirect exact from='/colorize/' to={Routes.Introduction} />

          <Route path={Routes.Introduction} component={IntroductionPage} />

          <Route path={Routes.FunctionIsValidColor} component={FunctionIsValidColorPage} />
          <Route path={Routes.FunctionGetColorFormat} component={FunctionGetColorFormatPage} />

          <Route path={Routes.FunctionConvertColor} component={FunctionConvertColorPage} />
          <Route path={Routes.FunctionExtractOpacity} component={FunctionExtractOpacityPage} />
          <Route path={Routes.FunctionParseColorNumbers} component={FunctionParseColorNumbersPage} />

          <Route path={Routes.FunctionGenerateSteppedGradient} component={FunctionGenerateSteppedGradientPage} />
          <Route path={Routes.FunctionGenerateMultiSteppedGradient} component={FunctionGenerateMultiSteppedGradientPage} />
          
          <Route path={Routes.FunctionBlendColors} component={FunctionBlendColorsPage} />
          <Route path={Routes.FunctionTint} component={FunctionTintPage} />
          <Route path={Routes.FunctionShade} component={FunctionShadePage} />
          <Route path={Routes.FunctionAdjustBrightness} component={FunctionAdjustBrightnessPage} />
          <Route path={Routes.FunctionAdjustSaturation} component={FunctionAdjustSaturationPage} />
          <Route path={Routes.FunctionInvertColor} component={FunctionInvertColorPage} />
          <Route path={Routes.FunctionApplySepia} component={FunctionApplySepiaPage} />
          <Route path={Routes.FunctionApplyGreyscale} component={FunctionApplySepiaPage} />
          <Route path={Routes.FunctionChangeOpacity} component={FunctionChangeOpacityPage} />
          
          <Route path={Routes.FunctionGetLuminance} component={FunctionGetLuminancePage} />
          <Route path={Routes.FunctionIsLight} component={FunctionIsLightPage} />
          <Route path={Routes.FunctionIsDark} component={FunctionIsDarkPage} />
          <Route path={Routes.FunctionCalculateContrast} component={FunctionCalculateContrastPage} />
          
          <Route path={Routes.EnumColorFormat} component={EnumColorFormatPage} />
        </Switch>
      </Content>
    </Container>
  </Router>
);

const Container = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 270px calc(100vw - 270px);
  grid-template-rows: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  overflow: scroll;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Content = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  overflow: scroll;
  position: relative;
  padding: 24px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 750px;
  margin: auto;
`;

const BaseLogo = styled.a`
  position: fixed;
  top: 16px;
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
  right: 16px;
`;

const NPMLogo = styled(BaseLogo)`
  right: 56px;
`;

export default App;
