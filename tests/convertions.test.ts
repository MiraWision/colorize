import { randomColor } from '../src/random-color';
import { convertColor } from '../src/convert-color';
import { extractOpacity } from '../src/extract-opacity';
import { parseColorNumbers } from '../src/parse-color-numbers';
import { 
  rgbToRGBA,
  hexToRGBA,
  hexaToRGBA,
  hslToRGBA,
  hslaToRGBA,
  cmykToRGBA,
  hsvToRGBA,
  rgbaToRGB,
  rgbaToHex,
  rgbaToHexa,
  rgbaToHSL,
  rgbaToHSLA,
  rgbaToCMYK,
  rgbaToHSV,
} from '../src/utils/convert-utils';
import { ColorFormat } from '../src/types';

describe('convertions', () => {
  describe('randomColor', () => {
    test('should generate a random color in HEX format by default', () => {
      const color = randomColor();
      expect(color).toMatch(/^#([0-9a-fA-F]{6})$/);
    });
  
    test('should generate a random color in HEX format when specified', () => {
      const color = randomColor(ColorFormat.HEX);
      expect(color).toMatch(/^#([0-9a-fA-F]{6})$/);
    });
  
    test('should generate a random color in HEXA format', () => {
      const color = randomColor(ColorFormat.HEXA);
      expect(color).toMatch(/^#([0-9a-fA-F]{8})$/);
    });
  
    test('should generate a random color in RGB format', () => {
      const color = randomColor(ColorFormat.RGB);
      expect(color).toMatch(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/);
      
      // @ts-ignore
      const [r, g, b] = color.match(/\d+/g).map(Number);
      expect(r).toBeGreaterThanOrEqual(0);
      expect(r).toBeLessThanOrEqual(255);
      expect(g).toBeGreaterThanOrEqual(0);
      expect(g).toBeLessThanOrEqual(255);
      expect(b).toBeGreaterThanOrEqual(0);
      expect(b).toBeLessThanOrEqual(255);
    });
  
    test('should generate a random color in RGBA format', () => {
      const color = randomColor(ColorFormat.RGBA);
      expect(color).toMatch(/^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, (\d|0?\.\d+)\)$/);
  
      // @ts-ignore
      const [r, g, b, a] = color.match(/(\d+(\.\d+)?)/g).map(Number);
      expect(r).toBeGreaterThanOrEqual(0);
      expect(r).toBeLessThanOrEqual(255);
      expect(g).toBeGreaterThanOrEqual(0);
      expect(g).toBeLessThanOrEqual(255);
      expect(b).toBeGreaterThanOrEqual(0);
      expect(b).toBeLessThanOrEqual(255);
      expect(a).toBeGreaterThanOrEqual(0);
      expect(a).toBeLessThanOrEqual(1);
    });
  
    test('should generate a random color in HSL format', () => {
      const color = randomColor(ColorFormat.HSL);
      expect(color).toMatch(/^hsl\(\d{1,3}, \d{1,3}%, \d{1,3}%\)$/);
  
      // @ts-ignore
      const [h, s, l] = color.match(/\d+/g).map(Number);
      expect(h).toBeGreaterThanOrEqual(0);
      expect(h).toBeLessThanOrEqual(360);
      expect(s).toBeGreaterThanOrEqual(0);
      expect(s).toBeLessThanOrEqual(100);
      expect(l).toBeGreaterThanOrEqual(0);
      expect(l).toBeLessThanOrEqual(100);
    });
  
    test('should generate a random color in HSLA format', () => {
      const color = randomColor(ColorFormat.HSLA);
      expect(color).toMatch(/^hsla\(\d{1,3}, \d{1,3}%, \d{1,3}%, (\d|0?\.\d+)\)$/);
  
      // @ts-ignore
      const [h, s, l, a] = color.match(/(\d+(\.\d+)?)/g).map(Number);
      expect(h).toBeGreaterThanOrEqual(0);
      expect(h).toBeLessThanOrEqual(360);
      expect(s).toBeGreaterThanOrEqual(0);
      expect(s).toBeLessThanOrEqual(100);
      expect(l).toBeGreaterThanOrEqual(0);
      expect(l).toBeLessThanOrEqual(100);
      expect(a).toBeGreaterThanOrEqual(0);
      expect(a).toBeLessThanOrEqual(1);
    });
  
    test('should generate a random color in HSV format', () => {
      const color = randomColor(ColorFormat.HSV);
      expect(color).toMatch(/^hsv\(\d{1,3}, \d{1,3}%, \d{1,3}%\)$/);
  
      // @ts-ignore
      const [h, s, v] = color.match(/\d+/g).map(Number);
      expect(h).toBeGreaterThanOrEqual(0);
      expect(h).toBeLessThanOrEqual(360);
      expect(s).toBeGreaterThanOrEqual(0);
      expect(s).toBeLessThanOrEqual(100);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(100);
    });
  
    test('should generate a random color in CMYK format', () => {
      const color = randomColor(ColorFormat.CMYK);
      expect(color).toMatch(/^cmyk\(\d{1,3}%, \d{1,3}%, \d{1,3}%, \d{1,3}%\)$/);
  
      // @ts-ignore
      const [c, m, y, k] = color.match(/\d+/g).map(Number);
      expect(c).toBeGreaterThanOrEqual(0);
      expect(c).toBeLessThanOrEqual(100);
      expect(m).toBeGreaterThanOrEqual(0);
      expect(m).toBeLessThanOrEqual(100);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(100);
      expect(k).toBeGreaterThanOrEqual(0);
      expect(k).toBeLessThanOrEqual(100);
    });
  });

  describe('extractOpacity', () => {
    it('should extract color and opacity from HEXA', () => {
      const { color, opacity } = extractOpacity('#ff573380');
      expect(color).toBe('#ff5733');
      expect(opacity).toBeCloseTo(0.5, 1);
    });

    it('should return opacity 1 for HEX color', () => {
      const { color, opacity } = extractOpacity('#ff5733');
      expect(color).toBe('#ff5733');
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
  
  describe('hexToRGBA', () => {
    it('should convert 3-digit HEX color to RGBA', () => {
      expect(hexToRGBA('#fff')).toBe('rgba(255, 255, 255, 1)');
      expect(hexToRGBA('#abc')).toBe('rgba(170, 187, 204, 1)');
    });

    it('should convert 6-digit HEX color to RGBA', () => {
      expect(hexToRGBA('#ffffff')).toBe('rgba(255, 255, 255, 1)');
      expect(hexToRGBA('#aabbcc')).toBe('rgba(170, 187, 204, 1)');
    });
  });

  describe('hexaToRGBA', () => {
    it('should convert 8-digit HEXA color to RGBA', () => {
      expect(hexaToRGBA('#ffffffff')).toBe('rgba(255, 255, 255, 1)');
      expect(hexaToRGBA('#aabbccff')).toBe('rgba(170, 187, 204, 1)');
      expect(hexaToRGBA('#aabbcc80')).toBe('rgba(170, 187, 204, 0.5)');
    });
  });

  describe('rgbToRGBA', () => {
    it('should convert RGB color to RGBA', () => {
      expect(rgbToRGBA('rgb(255, 255, 255)')).toBe('rgba(255, 255, 255, 1)');
      expect(rgbToRGBA('rgb(170, 187, 204)')).toBe('rgba(170, 187, 204, 1)');
    });
  });

  describe('hslToRGBA', () => {
    it('should convert HSL color to RGBA', () => {
      expect(hslToRGBA('hsl(0, 100%, 50%)')).toBe('rgba(255, 0, 0, 1)');
      expect(hslToRGBA('hsl(120, 100%, 50%)')).toBe('rgba(0, 255, 0, 1)');
      expect(hslToRGBA('hsl(240, 100%, 50%)')).toBe('rgba(0, 0, 255, 1)');
    });
  });

  describe('hslaToRGBA', () => {
    it('should convert HSLA color to RGBA', () => {
      expect(hslaToRGBA('hsla(0, 100%, 50%, 0.5)')).toBe('rgba(255, 0, 0, 0.5)');
      expect(hslaToRGBA('hsla(120, 100%, 50%, 0.3)')).toBe('rgba(0, 255, 0, 0.3)');
      expect(hslaToRGBA('hsla(240, 100%, 50%, 0.8)')).toBe('rgba(0, 0, 255, 0.8)');
    });
  });

  describe('cmykToRGBA', () => {
    it('should convert CMYK color to RGBA', () => {
      expect(cmykToRGBA('cmyk(0%, 0%, 0%, 0%)')).toBe('rgba(255, 255, 255, 1)');
      expect(cmykToRGBA('cmyk(0%, 100%, 100%, 0%)')).toBe('rgba(255, 0, 0, 1)');
      expect(cmykToRGBA('cmyk(100%, 0%, 100%, 0%)')).toBe('rgba(0, 255, 0, 1)');
    });
  });

  describe('hsvToRGBA', () => {
    it('should convert HSV color to RGBA', () => {
      expect(hsvToRGBA('hsv(0, 100%, 100%)')).toBe('rgba(255, 0, 0, 1)');
      expect(hsvToRGBA('hsv(120, 100%, 100%)')).toBe('rgba(0, 255, 0, 1)');
      expect(hsvToRGBA('hsv(240, 100%, 100%)')).toBe('rgba(0, 0, 255, 1)');
    });

    it('should handle grayscale (no saturation)', () => {
      expect(hsvToRGBA('hsv(0, 0%, 50%)')).toBe('rgba(128, 128, 128, 1)');
    });
  });

  describe('rgbaToHex', () => {
    it('should convert RGBA to HEX', () => {
      expect(rgbaToHex('rgba(255, 0, 0, 1)')).toBe('#ff0000');
      expect(rgbaToHex('rgba(0, 255, 0, 1)')).toBe('#00ff00');
      expect(rgbaToHex('rgba(0, 0, 255, 1)')).toBe('#0000ff');
    });
  });

  describe('rgbaToHexa', () => {
    it('should convert RGBA to HEXA', () => {
      expect(rgbaToHexa('rgba(255, 0, 0, 1)')).toBe('#ff0000ff');
      expect(rgbaToHexa('rgba(0, 255, 0, 0.5)')).toBe('#00ff0080');
      expect(rgbaToHexa('rgba(0, 0, 255, 0)')).toBe('#0000ff00');
    });
  });

  describe('rgbaToRGB', () => {
    it('should convert RGBA to RGB', () => {
      expect(rgbaToRGB('rgba(255, 0, 0, 1)')).toBe('rgb(255, 0, 0)');
      expect(rgbaToRGB('rgba(0, 255, 0, 0.5)')).toBe('rgb(0, 255, 0)');
      expect(rgbaToRGB('rgba(0, 0, 255, 0)')).toBe('rgb(0, 0, 255)');
    });
  });

  describe('rgbaToHSL', () => {
    it('should convert RGBA to HSL', () => {
      expect(rgbaToHSL('rgba(255, 0, 0, 1)')).toBe('hsl(0, 100%, 50%)');
      expect(rgbaToHSL('rgba(0, 255, 0, 1)')).toBe('hsl(120, 100%, 50%)');
      expect(rgbaToHSL('rgba(0, 0, 255, 1)')).toBe('hsl(240, 100%, 50%)');
    });
  });

  describe('rgbaToHSLA', () => {
    it('should convert RGBA to HSLA', () => {
      expect(rgbaToHSLA('rgba(255, 0, 0, 1)')).toBe('hsla(0, 100%, 50%, 1)');
      expect(rgbaToHSLA('rgba(0, 255, 0, 0.5)')).toBe('hsla(120, 100%, 50%, 0.5)');
      expect(rgbaToHSLA('rgba(0, 0, 255, 0.2)')).toBe('hsla(240, 100%, 50%, 0.2)');
    });
  });

  describe('rgbaToCMYK', () => {
    it('should convert RGBA to CMYK', () => {
      expect(rgbaToCMYK('rgba(255, 0, 0, 1)')).toBe('cmyk(0%, 100%, 100%, 0%)');
      expect(rgbaToCMYK('rgba(0, 255, 0, 1)')).toBe('cmyk(100%, 0%, 100%, 0%)');
      expect(rgbaToCMYK('rgba(0, 0, 255, 1)')).toBe('cmyk(100%, 100%, 0%, 0%)');
    });
  });

  describe('rgbaToHSV', () => {
    it('should convert RGBA to HSV', () => {
      expect(rgbaToHSV('rgba(255, 0, 0, 1)')).toBe('hsv(0, 100%, 100%)');
      expect(rgbaToHSV('rgba(0, 255, 0, 1)')).toBe('hsv(120, 100%, 100%)');
      expect(rgbaToHSV('rgba(0, 0, 255, 1)')).toBe('hsv(240, 100%, 100%)');
    });

    it('should handle grayscale (no saturation)', () => {
      expect(rgbaToHSV('rgba(128, 128, 128, 1)')).toBe('hsv(0, 0%, 50%)');
    });
  });

  describe('convertColor', () => {
    it('should correctly convert HEX to RGBA', () => {
      const result = convertColor('#ffffff', ColorFormat.RGBA);
      expect(result).toBe('rgba(255, 255, 255, 1)');
    });
  
    it('should correctly convert RGBA to HEX', () => {
      const result = convertColor('rgba(255, 255, 255, 1)', ColorFormat.HEX);
      expect(result).toBe('#ffffff');
    });
  
    it('should correctly convert HEX to RGB', () => {
      const result = convertColor('#ff0000', ColorFormat.RGB);
      expect(result).toBe('rgb(255, 0, 0)');
    });
  
    it('should correctly convert HSL to RGBA', () => {
      const result = convertColor('hsl(120, 100%, 50%)', ColorFormat.RGBA);
      expect(result).toBe('rgba(0, 255, 0, 1)');
    });
  
    it('should correctly convert CMYK to RGBA', () => {
      const result = convertColor('cmyk(0%, 0%, 0%, 0%)', ColorFormat.RGBA);
      expect(result).toBe('rgba(255, 255, 255, 1)');
    });
  
    it('should correctly convert RGBA to HSLA', () => {
      const result = convertColor('rgba(255, 0, 0, 1)', ColorFormat.HSLA);
      expect(result).toBe('hsla(0, 100%, 50%, 1)');
    });
  
    it('should correctly convert RGBA to CMYK', () => {
      const result = convertColor('rgba(0, 0, 0, 1)', ColorFormat.CMYK);
      expect(result).toBe('cmyk(0%, 0%, 0%, 100%)');
    });
  
    it('should correctly convert HSLA to RGB', () => {
      const result = convertColor('hsla(240, 100%, 50%, 1)', ColorFormat.RGB);
      expect(result).toBe('rgb(0, 0, 255)');
    });
  
    it('should correctly convert HSV to RGB', () => {
      const result = convertColor('hsv(120, 100%, 100%)', ColorFormat.RGB);
      expect(result).toBe('rgb(0, 255, 0)');
    });
  
    it('should correctly convert RGB to HEXA', () => {
      const result = convertColor('rgb(255, 0, 0)', ColorFormat.HEXA);
      expect(result).toBe('#ff0000ff');
    });
  
    it('should correctly convert HEXA to HSL', () => {
      const result = convertColor('#ff00ff80', ColorFormat.HSL);
      expect(result).toBe('hsl(300, 100%, 50%)');
    });
  
    it('should correctly convert CMYK to HEX', () => {
      const result = convertColor('cmyk(0%, 100%, 0%, 0%)', ColorFormat.HEX);
      expect(result).toBe('#ff00ff');
    });
  
    it('should return the same color when converting to the same format', () => {
      const color = '#ffffff';
      const result = convertColor(color, ColorFormat.HEX);
      expect(result).toBe(color);
    });
    
    it('should throw an error for invalid color format', () => {
      expect(() => {
        convertColor('invalid color', ColorFormat.HEX);
      }).toThrow('Invalid color format');
    });
  });
});

