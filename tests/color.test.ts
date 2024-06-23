import { Color } from '../src/color';
import { ColorFormat } from '../src/types';

describe('Color Class', () => {
  test('should correctly initialize with a valid color and format', () => {
    const color = new Color('#3498db');
    expect(color.get()).toBe('#3498db');
    expect(color.format()).toBe('hex');
  });

  test('should initialize with empty string for invalid color', () => {
    const color = new Color('invalidColor');
    expect(color.get()).toBe('');
    expect(color.format()).toBe('');
  });

  describe('Format Conversion Methods', () => {
    const color = new Color('#3498db');

    test('should convert to RGB format', () => {
      expect(color.rgb()).toBe('rgb(52, 152, 219)');
    });

    test('should convert to HEX format', () => {
      expect(color.hex()).toBe('#3498db');
    });

    test('should convert to RGBA format', () => {
      expect(color.rgba()).toBe('rgba(52, 152, 219, 1)');
    });

    test('should convert to HEXA format', () => {
      const colorWithAlpha = new Color('rgba(52, 152, 219, 0.5)');
      expect(colorWithAlpha.hexa()).toBe('#3498db80');
    });

    test('should convert to HSL format', () => {
      expect(color.hsl()).toBe('hsl(204, 70%, 53%)');
    });

    test('should convert to HSLA format', () => {
      const colorWithAlpha = new Color('rgba(52, 152, 219, 0.5)');
      expect(colorWithAlpha.hsla()).toBe('hsla(204, 70%, 53%, 0.5)');
    });

    test('should convert to HSV format', () => {
      expect(color.hsv()).toBe('hsv(204, 76%, 86%)');
    });

    test('should convert to CMYK format', () => {
      expect(color.cmyk()).toBe('cmyk(76%, 31%, 0%, 14%)');
    });
  });

  describe('Color Property Methods', () => {
    test('should extract opacity from RGBA color', () => {
      const color = new Color('rgba(52, 152, 219, 0.5)');
      expect(color.extractOpacity()).toEqual({ opacity: 0.5, color: 'rgb(52, 152, 219)' });
    });

    test('should parse color numbers for RGB format', () => {
      const color = new Color('rgb(52, 152, 219)');
      expect(color.parseNumbers(ColorFormat.RGB)).toEqual({ r: 52, g: 152, b: 219 });
    });

    test('should parse color numbers for RGBA format', () => {
      const color = new Color('rgba(52, 152, 219, 0.5)');
      expect(color.parseNumbers(ColorFormat.RGBA)).toEqual({ r: 52, g: 152, b: 219, a: 0.5 });
    });

    test('should parse color numbers for HSL format', () => {
      const color = new Color('hsl(204, 70%, 53%)');
      expect(color.parseNumbers(ColorFormat.HSL)).toEqual({ h: 204, s: 70, l: 53 });
    });

    test('should parse color numbers for HSLA format', () => {
      const color = new Color('hsla(204, 70%, 53%, 0.5)');
      expect(color.parseNumbers(ColorFormat.HSLA)).toEqual({ h: 204, s: 70, l: 53, a: 0.5 });
    });

    test('should calculate luminance', () => {
      const color = new Color('#3498db');
      expect(color.luminance()).toBeCloseTo(0.283, 3);
    });

    test('should detect light color', () => {
      const color = new Color('#ffffff');
      expect(color.isLight()).toBe(true);
    });

    test('should detect dark color', () => {
      const color = new Color('#000000');
      expect(color.isDark()).toBe(true);
    });
  });

  describe('Color Manipulation Methods', () => {
    let color: Color;

    beforeEach(() => {
      color = new Color('#3498db');
    });

    test('should apply and return new brightness', () => {
      expect(color.applyBrightness(10)).toBe('#5faee3');
      expect(color.get()).toBe('#5faee3');
    });

    test('should return new color with modified brightness without updating the current color', () => {
      expect(color.withBrightness(10)).toBe('#5faee3');
      expect(color.get()).toBe('#3498db');
    });

    test('should apply and return new saturation', () => {
      expect(color.applySaturation(-20)).toBe('#4b93c3');
      expect(color.get()).toBe('#4b93c3');
    });

    test('should return new color with modified saturation without updating the current color', () => {
      expect(color.withSaturation(-20)).toBe('#4b93c3');
      expect(color.get()).toBe('#3498db');
    });

    test('should apply and return grayscale', () => {
      expect(color.applyGrayscale()).toBe('#888888');
      expect(color.get()).toBe('#888888');
    });

    test('should return grayscale without updating the current color', () => {
      expect(color.withGrayscale()).toBe('#888888');
      expect(color.get()).toBe('#3498db');
    });

    test('should apply and return sepia', () => {
      expect(color.applySepia()).toBe('#b3ccba');
      expect(color.get()).toBe('#b3ccba');
    });

    test('should return sepia without updating the current color', () => {
      expect(color.withSepia()).toBe('#b3ccba');
      expect(color.get()).toBe('#3498db');
    });

    test('should apply and return new opacity', () => {
      color = new Color('rgba(52, 152, 219, 1)');
      expect(color.applyOpacity(0.5)).toBe('rgba(52, 152, 219, 0.5)');
      expect(color.get()).toBe('rgba(52, 152, 219, 0.5)');
    });

    test('should return new color with modified opacity without updating the current color', () => {
      color = new Color('rgba(52, 152, 219, 1)');
      expect(color.withOpacity(0.5)).toBe('rgba(52, 152, 219, 0.5)');
      expect(color.get()).toBe('rgba(52, 152, 219, 1)');
    });

    test('should apply and return inverted color', () => {
      expect(color.applyInvert()).toBe('#cb6724');
      expect(color.get()).toBe('#cb6724');
    });

    test('should return inverted color without updating the current color', () => {
      expect(color.withInvert()).toBe('#cb6724');
      expect(color.get()).toBe('#3498db');
    });

    test('should apply and return shaded color', () => {
      expect(color.applyShade(0.2)).toBe('#2a7aaf');
      expect(color.get()).toBe('#2a7aaf');
    });

    test('should return shaded color without updating the current color', () => {
      expect(color.withShade(0.2)).toBe('#2a7aaf');
      expect(color.get()).toBe('#3498db');
    });

    test('should apply and return tinted color', () => {
      expect(color.applyTint(0.2)).toBe('#5dade2');
      expect(color.get()).toBe('#5dade2');
    });

    test('should return tinted color without updating the current color', () => {
      expect(color.withTint(0.2)).toBe('#5dade2');
      expect(color.get()).toBe('#3498db');
    });
  });
});
