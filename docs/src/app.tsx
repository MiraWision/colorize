import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Routes } from './routes';

import { Logo } from './components/common/logo';
import { MenuList } from './components/menu/menu-list';
import { IntroductionPage } from './pages/introduction';
import { Button } from 'primereact/button';
import DocumentTitle from './components/common/dynamic-title';
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
import { FunctionApplyGreyscalePage } from './pages/function-apply-greyscale';

const App: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth > 768 && isSidebarVisible) {
      setIsSidebarVisible(false);
    }
  }, [windowWidth, isSidebarVisible]);

  const toggleSidebar = () => {
    setIsSidebarVisible(prev => !prev);
  };

  const isMobile = windowWidth <= 768;

  return (
    <Router>
      <DocumentTitle />
      <Container>
        {isMobile && (
            <HamburgerIcon onClick={toggleSidebar}>
              <Button
                icon="pi pi-bars"
                className="p-button-rounded p-button-text"
                aria-label="Menu"
              />
            </HamburgerIcon>
          )}
        {isMobile && isSidebarVisible && <Overlay onClick={toggleSidebar} />}
        <Sidebar isVisible={isMobile && isSidebarVisible}>
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
          <StyledSwitch>
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
            <Route path={Routes.FunctionApplyGreyscale} component={FunctionApplyGreyscalePage} />
            <Route path={Routes.FunctionChangeOpacity} component={FunctionChangeOpacityPage} />
            
            <Route path={Routes.FunctionGetLuminance} component={FunctionGetLuminancePage} />
            <Route path={Routes.FunctionIsLight} component={FunctionIsLightPage} />
            <Route path={Routes.FunctionIsDark} component={FunctionIsDarkPage} />
            <Route path={Routes.FunctionCalculateContrast} component={FunctionCalculateContrastPage} />
            
            <Route path={Routes.EnumColorFormat} component={EnumColorFormatPage} />
          </StyledSwitch>
        </Content>
      </Container>
    </Router>
  )
};

const Container = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 270px calc(100vw - 270px);
  grid-template-rows: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledSwitch = styled(Switch)`
  @media (max-width: 768px) { 
    width: 100vw;
    padding: 30px 10px 10px 10px;
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  position: fixed;
  top: 5px;
  left: 5px;
  z-index: 10;

  @media (max-width: 768px) {
    display: block; 
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 500; 
  overflow: hidden;
`;

const Sidebar = styled.div<{ isVisible: boolean }>`
  padding: 24px; 
  position: relative;
  min-height: 100vh;
  max-height: 100vh;
  overflow: scroll;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 10px;
    position: fixed;
    top: 0;
    left: 0;
    min-height: 100vh;
    max-height: 100vh;
    background-color: white;
    z-index: 1000;
    transform: ${(props) => (props.isVisible ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.3s ease-in-out;
  }
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

  @media (max-width: 768px) { 
    width: 100vw;
  }
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
