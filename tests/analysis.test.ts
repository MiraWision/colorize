import { getLuminance } from '../src/get-luminance';
import { isLight } from '../src/is-light';
import { isDark } from '../src/is-dark';
import { calculateContrast } from '../src/calculate-contrast';
import { calculateSimilarity } from '../src/calculate-similarity';
import { getTemperature } from '../src/get-temperature';
import { Color } from '../src/color';

describe('analysis', () => {
  describe('calculateSimilarity Function', () => {
    test('should return 100% for identical colors (string input)', () => {
      const similarity = calculateSimilarity('#ff0000', '#ff0000');
      expect(similarity).toBe(100);
    });
  
    test('should return 100% for identical colors (Color instance input)', () => {
      const color1 = new Color('#ff0000');
      const color2 = new Color('#ff0000');
      const similarity = calculateSimilarity(color1, color2);
      expect(similarity).toBe(100);
    });
  
    test('should return 0% for completely different colors (red and green)', () => {
      const similarity = calculateSimilarity('#ff0000', '#00ff00');
      expect(similarity).toBeLessThan(30);
    });
  
    test('should return a similarity percentage for colors that are similar (red and slightly different red)', () => {
      const similarity = calculateSimilarity('#ff0000', '#ff0101');
      expect(similarity).toBeGreaterThan(99);
    });
  
    test('should handle conversion from different color formats', () => {
      const similarity = calculateSimilarity('rgb(255, 0, 0)', 'hsl(0, 100%, 50%)');
      expect(similarity).toBe(100);
    });
  
    test('should handle invalid color format gracefully', () => {
      const similarity = calculateSimilarity('invalidColor', '#00ff00');
      expect(similarity).toBeGreaterThanOrEqual(0);
      expect(similarity).toBeLessThanOrEqual(100);
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
      const expectedContrast = 1.44;
      expect(contrast).toBeCloseTo(expectedContrast, 2);
    });
  });

  describe('getTemperature', () => {
    describe('HEX color format', () => {
      it('should return correct temperature for warm orange color', () => {
        const temperature = getTemperature('#FF4500');
        expect(temperature).toBeGreaterThanOrEqual(1500);
        expect(temperature).toBeLessThanOrEqual(2500);
      });

      it('should return correct temperature for warm white color', () => {
        const temperature = getTemperature('#FFD700');
        expect(temperature).toBeGreaterThanOrEqual(2500);
        expect(temperature).toBeLessThanOrEqual(3500);
      });

      it('should return correct temperature for neutral white color', () => {
        const temperature = getTemperature('#FFFFFF');
        expect(temperature).toBeGreaterThanOrEqual(5000);
        expect(temperature).toBeLessThanOrEqual(7000);
      });

      it('should return correct temperature for cool blue color', () => {
        const temperature = getTemperature('#ADD8E6');
        expect(temperature).toBeGreaterThanOrEqual(8000);
        expect(temperature).toBeLessThanOrEqual(10000);
      });

      it('should handle pure black color', () => {
        const temperature = getTemperature('#000000');
        expect(temperature).toBe(6500); // Default fallback for very dark colors
      });
    });

    describe('RGB color format', () => {
      it('should return correct temperature for warm orange color in RGB', () => {
        const temperature = getTemperature('rgb(255, 69, 0)');
        expect(temperature).toBeGreaterThanOrEqual(1500);
        expect(temperature).toBeLessThanOrEqual(2500);
      });

      it('should return correct temperature for warm white color in RGB', () => {
        const temperature = getTemperature('rgb(255, 215, 0)');
        expect(temperature).toBeGreaterThanOrEqual(2500);
        expect(temperature).toBeLessThanOrEqual(3500);
      });

      it('should return correct temperature for neutral white color in RGB', () => {
        const temperature = getTemperature('rgb(255, 255, 255)');
        expect(temperature).toBeGreaterThanOrEqual(5000);
        expect(temperature).toBeLessThanOrEqual(7000);
      });
    });

    describe('HSL color format', () => {
      it('should return correct temperature for warm orange color in HSL', () => {
        const temperature = getTemperature('hsl(16, 100%, 50%)');
        expect(temperature).toBeGreaterThanOrEqual(1500);
        expect(temperature).toBeLessThanOrEqual(2500);
      });

      it('should return correct temperature for warm white color in HSL', () => {
        const temperature = getTemperature('hsl(51, 100%, 50%)');
        expect(temperature).toBeGreaterThanOrEqual(2500);
        expect(temperature).toBeLessThanOrEqual(3500);
      });

      it('should return correct temperature for neutral white color in HSL', () => {
        const temperature = getTemperature('hsl(0, 0%, 100%)');
        expect(temperature).toBeGreaterThanOrEqual(5000);
        expect(temperature).toBeLessThanOrEqual(7000);
      });
    });

    describe('Other color formats', () => {
      it('should handle RGBA format', () => {
        const temperature = getTemperature('rgba(255, 69, 0, 1)');
        expect(temperature).toBeGreaterThanOrEqual(1500);
        expect(temperature).toBeLessThanOrEqual(2500);
      });

      it('should handle HSLA format', () => {
        const temperature = getTemperature('hsla(16, 100%, 50%, 1)');
        expect(temperature).toBeGreaterThanOrEqual(1500);
        expect(temperature).toBeLessThanOrEqual(2500);
      });

      it('should handle HSV format', () => {
        const temperature = getTemperature('hsv(16, 100%, 100%)');
        expect(temperature).toBeGreaterThanOrEqual(1500);
        expect(temperature).toBeLessThanOrEqual(2500);
      });

      it('should handle CMYK format', () => {
        const temperature = getTemperature('cmyk(0%, 73%, 100%, 0%)');
        expect(temperature).toBeGreaterThanOrEqual(1500);
        expect(temperature).toBeLessThanOrEqual(2500);
      });
    });

    describe('Edge cases and error handling', () => {
      it('should handle invalid color format gracefully', () => {
        const temperature = getTemperature('invalidColor');
        expect(temperature).toBeGreaterThanOrEqual(1000);
        expect(temperature).toBeLessThanOrEqual(10000);
      });

      it('should handle empty string gracefully', () => {
        const temperature = getTemperature('');
        expect(temperature).toBeGreaterThanOrEqual(1000);
        expect(temperature).toBeLessThanOrEqual(10000);
      });

      it('should always return temperature within valid range', () => {
        const testColors = [
          '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
          'rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)',
          'hsl(0, 100%, 50%)', 'hsl(120, 100%, 50%)', 'hsl(240, 100%, 50%)'
        ];

        testColors.forEach(color => {
          const temperature = getTemperature(color);
          expect(temperature).toBeGreaterThanOrEqual(1000);
          expect(temperature).toBeLessThanOrEqual(10000);
          expect(typeof temperature).toBe('number');
          expect(isFinite(temperature)).toBe(true);
        });
      });
    });

    describe('Consistency across formats', () => {
      it('should return consistent temperatures for same color in different formats', () => {
        const hexTemp = getTemperature('#FF4500');
        const rgbTemp = getTemperature('rgb(255, 69, 0)');
        const hslTemp = getTemperature('hsl(16, 100%, 50%)');

        // All should be very close to each other (within 50 degrees)
        expect(Math.abs(hexTemp - rgbTemp)).toBeLessThan(50);
        expect(Math.abs(hexTemp - hslTemp)).toBeLessThan(50);
      });

      it('should return consistent temperatures for white in different formats', () => {
        const hexTemp = getTemperature('#FFFFFF');
        const rgbTemp = getTemperature('rgb(255, 255, 255)');
        const hslTemp = getTemperature('hsl(0, 0%, 100%)');

        // All should be very close to each other (within 50 degrees)
        expect(Math.abs(hexTemp - rgbTemp)).toBeLessThan(50);
        expect(Math.abs(hexTemp - hslTemp)).toBeLessThan(50);
      });
    });
  });
});

