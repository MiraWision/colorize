import { getLuminance } from '../src/get-luminance';
import { isLight } from '../src/is-light';
import { isDark } from '../src/is-dark';
import { calculateContrast } from '../src/calculate-contrast';

describe('analysis', () => {
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
});

