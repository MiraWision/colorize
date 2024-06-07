import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Routes } from '../../routes';

const titles: { [K in Routes]?: string } = {
  [Routes.Introduction]: 'Introduction - Colorize by MiraWision',
  
  [Routes.FunctionIsValidColor]: 'Validation & Detection: Is Valid Color - Colorize by MiraWision',
  [Routes.FunctionGetColorFormat]: 'Validation & Detection: Get Color Format - Colorize by MiraWision',
  
  [Routes.FunctionConvertColor]: 'Conversion: Convert Color - Colorize by MiraWision',
  [Routes.FunctionExtractOpacity]: 'Conversion: Extract Opacity - Colorize by MiraWision',
  [Routes.FunctionParseColorNumbers]: 'Conversion: Parse Color Numbers - Colorize by MiraWision',
  
  [Routes.FunctionGenerateSteppedGradient]: 'Gradients: Generate Stepped Gradient - Colorize by MiraWision',
  [Routes.FunctionGenerateMultiSteppedGradient]: 'Gradients: Generate Multi-Stepped Gradient - Colorize by MiraWision',
  
  [Routes.FunctionBlendColors]: 'Manipulations: Blend Colors - Colorize by MiraWision',
  [Routes.FunctionTint]: 'Manipulations: Tint - Colorize by MiraWision',
  [Routes.FunctionShade]: 'Manipulations: Shade - Colorize by MiraWision',
  [Routes.FunctionAdjustBrightness]: 'Manipulations: Adjust Brightness - Colorize by MiraWision',
  [Routes.FunctionAdjustSaturation]: 'Manipulations: Adjust Saturation - Colorize by MiraWision',
  [Routes.FunctionInvertColor]: 'Manipulations: Invert Color - Colorize by MiraWision',
  [Routes.FunctionApplySepia]: 'Manipulations: Apply Sepia - Colorize by MiraWision',
  [Routes.FunctionApplyGreyscale]: 'Manipulations: Apply Greyscale - Colorize by MiraWision',
  [Routes.FunctionChangeOpacity]: 'Manipulations: Change Opacity - Colorize by MiraWision',
  
  [Routes.FunctionGetLuminance]: 'Analysis: Get Luminance - Colorize by MiraWision',
  [Routes.FunctionIsLight]: 'Analysis: Is Light - Colorize by MiraWision',
  [Routes.FunctionIsDark]: 'Analysis: Is Dark - Colorize by MiraWision',
  [Routes.FunctionCalculateContrast]: 'Analysis: Calculate Contrast - Colorize by MiraWision',
  
  [Routes.EnumColorFormat]: 'Types: Color Format - Colorize by MiraWision',
};

const DocumentTitle: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const title = titles[location.pathname as Routes] || 'Colorize by MiraWision';
    document.title = title;
  }, [location.pathname]); 

  return null;
};

export default DocumentTitle;