import { calculateContrast, extractOpacity, getLuminance, isDark, isLight, parseColorNumbers } from '../src/tools/analysis'

import { ColorFormat } from '../src/types';

describe('analysis', () => {
  describe('extractOpacity', () => {
    it('should extract color and opacity from HEXA', () => {
      const { color, opacity } = extractOpacity('#FF573380');
      expect(color).toBe('#FF5733');
      expect(opacity).toBeCloseTo(0.5, 1);
    });

    it('should return opacity 1 for HEX color', () => {
      const { color, opacity } = extractOpacity('#FF5733');
      expect(color).toBe('#FF5733');
      expect(opacity).toBe(1);
    });

    it('should extract color and opacity from RGBA', () => {
      const { color, opacity } = extractOpacity('rgba(255, 87, 51, 0.5)');
      expect(color).toBe('rgb(255, 87, 51)');
      expect(opacity).toBe(0.5);
    });

    it('should throw an error for invalid color format', () => {
      expect(() => {
        extractOpacity('invalidColor');
      }).toThrow('Invalid color format');
    });
  });

  describe('parseColorNumbers', () => {
    it('should parse RGB color', () => {
      const result = parseColorNumbers('rgb(255, 87, 51)', ColorFormat.RGB);
      expect(result).toEqual({ r: 255, g: 87, b: 51 });
    });
  
    it('should parse RGBA color and include alpha', () => {
      const result = parseColorNumbers('rgba(255, 87, 51, 0.5)', ColorFormat.RGBA);
      expect(result).toEqual({ r: 255, g: 87, b: 51, a: 0.5 });
    });
  
    it('should parse HSL color', () => {
      const result = parseColorNumbers('hsl(30, 100%, 50%)', ColorFormat.HSL);
      expect(result).toEqual({ h: 30, s: 100, l: 50 });
    });
  
    it('should parse HSLA color and include alpha', () => {
      const result = parseColorNumbers('hsla(30, 100%, 50%, 0.5)', ColorFormat.HSLA);
      expect(result).toEqual({ h: 30, s: 100, l: 50, a: 0.5 });
    });
  
    it('should throw an error for invalid color format', () => {
      expect(() => {
        parseColorNumbers('invalidColor', ColorFormat.RGB);
      }).toThrow('Invalid color format');
    });
  
    it('should throw an error for invalid format specified', () => {
      expect(() => {
        // @ts-ignore
        parseColorNumbers('rgb(255, 87, 51)', 'invalid');
      }).toThrow('Invalid format specified');
    });
  });

  describe('getLuminance', () => {
    it('calculates the luminance of white', () => {
      expect(getLuminance('#FFFFFF')).toBeCloseTo(1, 5);
    });

    it('calculates the luminance of black', () => {
      expect(getLuminance('#000000')).toBeCloseTo(0, 5);
    });

    it('calculates the luminance of mid-gray', () => {
      expect(getLuminance('#808080')).toBeCloseTo(0.21586, 5);
    });

    // Add more tests for different colors
  });

  describe('isLight', () => {
    it('returns true for a light color', () => {
      expect(isLight('#FFFFFF')).toBe(true);
    });

    it('returns false for a dark color', () => {
      expect(isLight('#000000')).toBe(false);
    });
  });

  describe('isDark', () => {
    it('returns true for a dark color', () => {
      expect(isDark('#000000')).toBe(true);
    });

    it('returns false for a light color', () => {
      expect(isDark('#FFFFFF')).toBe(false);
    });
  });

  describe('calculateContrast', () => {
    it('calculates maximum contrast between black and white', () => {
      const contrast = calculateContrast('#000000', '#FFFFFF');
      expect(contrast).toBeCloseTo(21, 2);
    });
  
    it('calculates minimum contrast between the same colors', () => {
      const contrast = calculateContrast('#FFFFFF', '#FFFFFF');
      expect(contrast).toBeCloseTo(1, 2);
    });
  
    it('calculates correct contrast between two arbitrary colors', () => {
      const contrast = calculateContrast('#123456', '#654321');
      const expectedContrast = 8.23;
      expect(contrast).toBeCloseTo(expectedContrast, 2);
    });
  });
});

