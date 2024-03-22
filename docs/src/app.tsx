import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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

const App: React.FC = () => (
  <Router>
    <Container>
      <Sidebar>
        <Logo />
        <MenuList />
      </Sidebar>
      <Content>
        <Switch>
          <Route exact path={Routes.Introduction} component={IntroductionPage} />
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

export default App;
