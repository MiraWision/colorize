import { 
  generateSteppedGradient,
  blendColors,
  adjustBrightness,
  adjustSaturation,
  invertColor,
  applySepia,
  changeOpacity,
  extractOpacity,
  parseColorNumbers,
  generateComplexGradient,
  getLuminance,
  isLight,
  isDark,
} from '../src/tools/manipulations';
import { ColorFormat } from '../src/types';

describe('Color manipulation tests', () => {
  describe('generateSteppedGradient', () => {
    it('should generate a stepped gradient with valid colors', () => {
      const gradient = generateSteppedGradient('rgb(255, 0, 0)', 'rgb(0, 0, 255)', 3);
      expect(gradient.length).toBe(3);
      expect(gradient.join(';')).toBe(['rgb(191, 0, 64)', 'rgb(128, 0, 128)', 'rgb(64, 0, 191)'].join(';'));
    });

    it('should throw an error for invalid color formats', () => {
      expect(() => {
        generateSteppedGradient('not a color', 'rgb(0, 0, 255)', 3);
      }).toThrow('Invalid color format');

      expect(() => {
        generateSteppedGradient('rgb(255, 0, 0)', 'not a color', 3);
      }).toThrow('Invalid color format');
    });
  });

  describe('blendColors', () => {
    it('should correctly blend two colors', () => {
      // Simple blend check with a 50% weight
      const blend = blendColors('rgb(255, 0, 0)', 'rgb(0, 0, 255)', 0.5);
      // Expecting a perfect blend of red and blue -> purple
      expect(blend).toBe('rgb(128, 0, 128)');
    });

    it('should throw an error for invalid color formats', () => {
      expect(() => {
        blendColors('not a color', 'rgb(0, 0, 255)', 0.5);
      }).toThrow('Invalid color format');

      expect(() => {
        blendColors('rgb(255, 0, 0)', 'not a color', 0.5);
      }).toThrow('Invalid color format');
    });
  });

  describe('adjustBrightness', () => {
    it('should increase the brightness of a color', () => {
      const brighter = adjustBrightness('hsl(120, 50%, 50%)', 20);
      expect(brighter).toBe('hsl(120, 50%, 70%)');
    });

    it('should decrease the brightness of a color', () => {
      const darker = adjustBrightness('hsl(120, 50%, 50%)', -20);
      expect(darker).toBe('hsl(120, 50%, 30%)');
    });

    it('should not allow the brightness to exceed valid bounds', () => {
      const tooBright = adjustBrightness('hsl(120, 50%, 95%)', 10);
      expect(tooBright).toBe('hsl(120, 50%, 100%)');
    });

    it('should throw an error for invalid color formats', () => {
      expect(() => {
        adjustBrightness('not a color', 20);
      }).toThrow('Invalid color format');
    });
  });

  describe('adjustSaturation', () => {
    it('should increase the saturation of a color', () => {
      const moreSaturated = adjustSaturation('hsl(120, 50%, 50%)', 20);
      expect(moreSaturated).toBe('hsl(120, 70%, 50%)');
    });

    it('should decrease the saturation of a color', () => {
      const lessSaturated = adjustSaturation('hsl(120, 50%, 50%)', -20);
      expect(lessSaturated).toBe('hsl(120, 30%, 50%)');
    });

    it('should not allow the saturation to exceed valid bounds', () => {
      const tooSaturated = adjustSaturation('hsl(120, 95%, 50%)', 10);
      expect(tooSaturated).toBe('hsl(120, 100%, 50%)');
    });

    it('should throw an error for invalid color formats', () => {
      expect(() => {
        adjustSaturation('not a color', 20);
      }).toThrow('Invalid color format');
    });
  });

  describe('invertColor', () => {
    it('should invert a color', () => {
      const inverted = invertColor('rgb(255, 255, 255)');
      expect(inverted).toBe('rgb(0, 0, 0)');

      const invertedBlack = invertColor('rgb(0, 0, 0)');
      expect(invertedBlack).toBe('rgb(255, 255, 255)');
    });

    it('should throw an error for invalid color formats', () => {
      expect(() => {
        invertColor('not a color');
      }).toThrow('Invalid color format');
    });
  });

  describe('applySepia', () => {
    it('should apply a sepia tone to a color', () => {
      const sepia = applySepia('rgb(255, 255, 255)');
      expect(sepia).toBe('rgb(255, 255, 239)');
    });

    it('should apply a sepia tone to a color', () => {
      const sepia = applySepia('rgb(255, 0, 0)');
      expect(sepia).toBe('rgb(100, 35, 46)');
    });

    it('should throw an error for invalid color formats', () => {
      expect(() => {
        applySepia('not a color');
      }).toThrow('Invalid color format');
    });
  });

  describe('changeOpacity', () => {
    it('should change the opacity of a color', () => {
      const newOpacity = changeOpacity('rgba(255, 255, 255, 0.5)', 0.7);
      expect(newOpacity).toBe('rgba(255, 255, 255, 0.7)');

      const newOpacityClamped = changeOpacity('rgba(255, 255, 255, 0.5)', 1.5);
      expect(newOpacityClamped).toBe('rgba(255, 255, 255, 1)');
    });

    it('should throw an error for invalid color formats', () => {
      expect(() => {
        changeOpacity('not a color', 0.5);
      }).toThrow('Invalid color format');
    });
  });

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

  describe('generateComplexGradient', () => {
    it('generates a complex gradient with given colors and steps', () => {
      const gradient = generateComplexGradient("#ff0000", 3, "#ffff00", 2, "#00ff00");
      expect(gradient.length).toBe(8);
      expect(gradient).toEqual(expect.arrayContaining(["#ff0000", "#ffff00", "#00ff00"]));
    });
  
    it('throws an error if the number of arguments is incorrect', () => {
      expect(() => {
        generateComplexGradient("#ff0000");
      }).toThrow();
  
      expect(() => {
        generateComplexGradient("#ff0000", 3);
      }).toThrow();
    });
  
    it('throws an error if colors and steps are not in the correct format', () => {
      expect(() => {
        generateComplexGradient("#ff0000", "#00ff00", 3);
      }).toThrow();
  
      expect(() => {
        generateComplexGradient(3, "#ff0000", "#00ff00");
      }).toThrow();
    });
  
    it('includes all specified colors in the output', () => {
      const gradient = generateComplexGradient("#ff0000", 1, "#00ff00", 1, "#0000ff");
      expect(gradient).toContain("#ff0000");
      expect(gradient).toContain("#00ff00");
      expect(gradient).toContain("#0000ff");
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

    // Add more tests for different colors
  });

  describe('isDark', () => {
    it('returns true for a dark color', () => {
      expect(isDark('#000000')).toBe(true);
    });

    it('returns false for a light color', () => {
      expect(isDark('#FFFFFF')).toBe(false);
    });

    // Add more tests for different colors
  });

});
