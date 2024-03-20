const { 
  isValidHEXColor,
  isValidHEXAColor,
  isValidRGBColor,
  isValidRGBAColor,
  isValidHSLColor,
  isValidHSLAColor,
  isValidCMYKColor,
  isValidHSVColor,
  isValidColor,
  getColorFormat,
  ColorFormat,
} = require('@mirawision/colorize');

describe('Color validation tests', () => {
  describe('isValidHEXColor', () => {
    it('should return true for valid 3-digit HEX colors', () => {
      expect(isValidHEXColor('#fff')).toBeTruthy();
      expect(isValidHEXColor('#abc')).toBeTruthy();
    });

    it('should return true for valid 6-digit HEX colors', () => {
      expect(isValidHEXColor('#ffffff')).toBeTruthy();
      expect(isValidHEXColor('#aabbcc')).toBeTruthy();
    });

    it('should return false for invalid HEX colors', () => {
      expect(isValidHEXColor('#ggg')).toBeFalsy();
      expect(isValidHEXColor('#12345')).toBeFalsy();
      expect(isValidHEXColor('123456')).toBeFalsy();
      expect(isValidHEXColor('#aabbccdd')).toBeFalsy();
    });

    it('should return false for non-string inputs', () => {
      expect(isValidHEXColor(123)).toBeFalsy();
      expect(isValidHEXColor(null)).toBeFalsy();
      expect(isValidHEXColor(undefined)).toBeFalsy();
    });
  });

  describe('isValidHEXAColor', () => {
    it('should return true for valid 4-digit HEXA colors', () => {
      expect(isValidHEXAColor('#ffff')).toBeTruthy();
      expect(isValidHEXAColor('#abcd')).toBeTruthy();
    });

    it('should return true for valid 8-digit HEXA colors', () => {
      expect(isValidHEXAColor('#ffffffff')).toBeTruthy();
      expect(isValidHEXAColor('#aabbccdd')).toBeTruthy();
    });

    it('should return false for invalid HEXA colors', () => {
      expect(isValidHEXAColor('#gggg')).toBeFalsy();
      expect(isValidHEXAColor('#12345')).toBeFalsy();
      expect(isValidHEXAColor('12345678')).toBeFalsy();
      expect(isValidHEXAColor('#aabbcc')).toBeFalsy();
    });

    it('should return false for non-string inputs', () => {
      expect(isValidHEXAColor(1234)).toBeFalsy();
      expect(isValidHEXAColor(null)).toBeFalsy();
      expect(isValidHEXAColor(undefined)).toBeFalsy();
    });
  });

  describe('isValidRGBColor', () => {
    it('should return true for valid RGB colors', () => {
      expect(isValidRGBColor('rgb(255, 0, 0)')).toBeTruthy();
      expect(isValidRGBColor('rgb(0, 255, 0)')).toBeTruthy();
      expect(isValidRGBColor('rgb(0, 0, 255)')).toBeTruthy();
    });

    it('should return false for invalid RGB colors', () => {
      expect(isValidRGBColor('rgb(256, 0, 0)')).toBeFalsy();
      expect(isValidRGBColor('rgb(-1, 0, 0)')).toBeFalsy();
      expect(isValidRGBColor('rgb(0, 0, 0, 0)')).toBeFalsy(); // Extra value
      expect(isValidRGBColor('rgb(255.0, 0, 0)')).toBeFalsy(); // Decimal not allowed
    });

    it('should return false for non-string inputs', () => {
      expect(isValidRGBColor(123)).toBeFalsy();
      expect(isValidRGBColor(null)).toBeFalsy();
      expect(isValidRGBColor(undefined)).toBeFalsy();
    });
  });

  describe('isValidRGBAColor', () => {
    it('should return true for valid RGBA colors', () => {
      expect(isValidRGBAColor('rgba(255, 0, 0, 1)')).toBeTruthy();
      expect(isValidRGBAColor('rgba(0, 255, 0, 0.5)')).toBeTruthy();
      expect(isValidRGBAColor('rgba(0, 0, 255, 0.0)')).toBeTruthy();
    });

    it('should return false for invalid RGBA colors', () => {
      expect(isValidRGBAColor('rgba(256, 0, 0, 1)')).toBeFalsy();
      expect(isValidRGBAColor('rgba(-1, 0, 0, 1)')).toBeFalsy();
      expect(isValidRGBAColor('rgba(0, 0, 0)')).toBeFalsy(); // Missing alpha
      expect(isValidRGBAColor('rgba(255, 0, 0, 1.1)')).toBeFalsy(); // Alpha out of bounds
    });

    it('should return false for non-string inputs', () => {
      expect(isValidRGBAColor(123)).toBeFalsy();
      expect(isValidRGBAColor(null)).toBeFalsy();
      expect(isValidRGBAColor(undefined)).toBeFalsy();
    });
  });

  describe('isValidHSLColor', () => {
    it('should return true for valid HSL colors', () => {
      expect(isValidHSLColor('hsl(120, 50%, 50%)')).toBeTruthy();
      expect(isValidHSLColor('hsl(0, 100%, 100%)')).toBeTruthy();
      expect(isValidHSLColor('hsl(360, 0%, 0%)')).toBeTruthy();
    });

    it('should return false for invalid HSL colors', () => {
      expect(isValidHSLColor('hsl(361, 50%, 50%)')).toBeFalsy(); // Hue out of bounds
      expect(isValidHSLColor('hsl(120, 101%, 50%)')).toBeFalsy(); // Saturation out of bounds
      expect(isValidHSLColor('hsl(120, 50%, 101%)')).toBeFalsy(); // Lightness out of bounds
      expect(isValidHSLColor('hsl(120, 50, 50)')).toBeFalsy(); // Missing percent signs
    });

    it('should return false for non-string inputs', () => {
      expect(isValidHSLColor(123)).toBeFalsy();
      expect(isValidHSLColor(null)).toBeFalsy();
      expect(isValidHSLColor(undefined)).toBeFalsy();
    });
  });

  describe('isValidHSLAColor', () => {
    it('should return true for valid HSLA colors', () => {
      expect(isValidHSLAColor('hsla(240, 100%, 50%, 1)')).toBeTruthy();
      expect(isValidHSLAColor('hsla(120, 50%, 50%, 0.5)')).toBeTruthy();
      expect(isValidHSLAColor('hsla(0, 0%, 0%, 0)')).toBeTruthy();
    });

    it('should return false for invalid HSLA colors', () => {
      expect(isValidHSLAColor('hsla(240, 100%, 50%, 1.1)')).toBeFalsy(); // Alpha out of bounds
      expect(isValidHSLAColor('hsla(240, 100%, 101%, 0.5)')).toBeFalsy(); // Lightness out of bounds
      expect(isValidHSLAColor('hsla(240, 101%, 50%, 0.5)')).toBeFalsy(); // Saturation out of bounds
      expect(isValidHSLAColor('hsla(360, 50%, 50%, -0.1)')).toBeFalsy(); // Alpha out of bounds
    });

    it('should return false for non-string inputs', () => {
      expect(isValidHSLAColor(123)).toBeFalsy();
      expect(isValidHSLAColor(null)).toBeFalsy();
      expect(isValidHSLAColor(undefined)).toBeFalsy();
    });
  });

  describe('isValidCMYKColor', () => {
    it('should return true for valid CMYK colors', () => {
      expect(isValidCMYKColor('cmyk(0%, 0%, 0%, 0%)')).toBeTruthy();
      expect(isValidCMYKColor('cmyk(100%, 100%, 100%, 100%)')).toBeTruthy();
      expect(isValidCMYKColor('cmyk(50%, 50%, 50%, 50%)')).toBeTruthy();
    });

    it('should return false for invalid CMYK colors', () => {
      expect(isValidCMYKColor('cmyk(101%, 0%, 0%, 0%)')).toBeFalsy(); // C out of bounds
      expect(isValidCMYKColor('cmyk(0%, 101%, 0%, 0%)')).toBeFalsy(); // M out of bounds
      expect(isValidCMYKColor('cmyk(0%, 0%, 101%, 0%)')).toBeFalsy(); // Y out of bounds
      expect(isValidCMYKColor('cmyk(0%, 0%, 0%, 101%)')).toBeFalsy(); // K out of bounds
    });

    it('should return false for non-string inputs', () => {
      expect(isValidCMYKColor(123)).toBeFalsy();
      expect(isValidCMYKColor(null)).toBeFalsy();
      expect(isValidCMYKColor(undefined)).toBeFalsy();
    });
  });

  describe('isValidHSVColor', () => {
    it('should return true for valid HSV colors', () => {
      expect(isValidHSVColor('hsv(0, 0%, 0%)')).toBeTruthy();
      expect(isValidHSVColor('hsv(360, 100%, 100%)')).toBeTruthy();
      expect(isValidHSVColor('hsv(180, 50%, 50%)')).toBeTruthy();
    });

    it('should return false for invalid HSV colors', () => {
      expect(isValidHSVColor('hsv(361, 0%, 0%)')).toBeFalsy(); // H out of bounds
      expect(isValidHSVColor('hsv(0, 101%, 0%)')).toBeFalsy(); // S out of bounds
      expect(isValidHSVColor('hsv(0, 0%, 101%)')).toBeFalsy(); // V out of bounds
    });

    it('should return false for non-string inputs', () => {
      expect(isValidHSVColor(123)).toBeFalsy();
      expect(isValidHSVColor(null)).toBeFalsy();
      expect(isValidHSVColor(undefined)).toBeFalsy();
    });
  });

  describe('isValidColor', () => {
    it('should return true for valid HEX colors', () => {
      expect(isValidColor('#ffffff')).toBeTruthy();
      expect(isValidColor('#fff')).toBeTruthy();
    });
  
    it('should return true for valid HEXA colors', () => {
      expect(isValidColor('#ffffffff')).toBeTruthy();
      expect(isValidColor('#ffff')).toBeTruthy();
    });
  
    it('should return true for valid RGB colors', () => {
      expect(isValidColor('rgb(255, 0, 0)')).toBeTruthy();
    });
  
    it('should return true for valid RGBA colors', () => {
      expect(isValidColor('rgba(255, 0, 0, 1)')).toBeTruthy();
    });
  
    it('should return true for valid HSL colors', () => {
      expect(isValidColor('hsl(120, 100%, 50%)')).toBeTruthy();
    });
  
    it('should return true for valid HSLA colors', () => {
      expect(isValidColor('hsla(120, 100%, 50%, 0.5)')).toBeTruthy();
    });
  
    it('should return true for valid HSV colors', () => {
      expect(isValidColor('hsv(0, 0%, 100%)')).toBeTruthy();
    });
  
    it('should return true for valid CMYK colors', () => {
      expect(isValidColor('cmyk(0%, 100%, 100%, 0%)')).toBeTruthy();
    });
  
    it('should return false for invalid color formats', () => {
      expect(isValidColor('not a color')).toBeFalsy();
      expect(isValidColor('#gggggg')).toBeFalsy();
      expect(isValidColor('rgb(256, 0, 0)')).toBeFalsy();
      expect(isValidColor('rgba(0, 0, 0, 2)')).toBeFalsy();
      expect(isValidColor('hsl(370, 100%, 50%)')).toBeFalsy();
      expect(isValidColor('hsla(120, 200%, 50%, 1)')).toBeFalsy();
      expect(isValidColor('hsv(0, 101%, 0%)')).toBeFalsy();
      expect(isValidColor('cmyk(0%, 0%, 0%, 101%)')).toBeFalsy();
    });
  });

  describe('getColorFormat', () => {
    it('should identify HEX color format', () => {
      expect(getColorFormat('#ffffff')).toBe(ColorFormat.HEX);
      expect(getColorFormat('#fff')).toBe(ColorFormat.HEX);
    });
  
    it('should identify HEXA color format', () => {
      expect(getColorFormat('#ffffffff')).toBe(ColorFormat.HEXA);
      expect(getColorFormat('#ffff')).toBe(ColorFormat.HEXA);
    });
  
    it('should identify RGB color format', () => {
      expect(getColorFormat('rgb(255, 0, 0)')).toBe(ColorFormat.RGB);
    });
  
    it('should identify RGBA color format', () => {
      expect(getColorFormat('rgba(255, 0, 0, 1)')).toBe(ColorFormat.RGBA);
    });
  
    it('should identify HSL color format', () => {
      expect(getColorFormat('hsl(120, 100%, 50%)')).toBe(ColorFormat.HSL);
    });
  
    it('should identify HSLA color format', () => {
      expect(getColorFormat('hsla(120, 100%, 50%, 0.5)')).toBe(ColorFormat.HSLA);
    });
  
    it('should identify HSV color format', () => {
      expect(getColorFormat('hsv(0, 0%, 100%)')).toBe(ColorFormat.HSV);
    });
  
    it('should identify CMYK color format', () => {
      expect(getColorFormat('cmyk(0%, 100%, 100%, 0%)')).toBe(ColorFormat.CMYK);
    });
  
    it('should return null for unrecognized color formats', () => {
      expect(getColorFormat('not a color')).toBeNull();
      expect(getColorFormat('#gggggg')).toBeNull();
      expect(getColorFormat('rgb(256, 0, 0)')).toBeNull();
      expect(getColorFormat('rgba(0, 0, 0, 2)')).toBeNull();
      expect(getColorFormat('hsl(370, 100%, 50%)')).toBeNull();
      expect(getColorFormat('hsla(120, 200%, 50%, 1)')).toBeNull();
      expect(getColorFormat('hsv(0, 101%, 0%)')).toBeNull();
      expect(getColorFormat('cmyk(0%, 0%, 0%, 101%)')).toBeNull();
    });
  });
});
