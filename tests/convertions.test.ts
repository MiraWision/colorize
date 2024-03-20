import { 
  convertColor,
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
} from '../src/tools/convertions';
import { ColorFormat } from '../src/types';

describe('Color conversion tests', () => {
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
      expect(rgbaToHex('rgba(255, 0, 0, 1)')).toBe('#FF0000');
      expect(rgbaToHex('rgba(0, 255, 0, 1)')).toBe('#00FF00');
      expect(rgbaToHex('rgba(0, 0, 255, 1)')).toBe('#0000FF');
    });
  });

  describe('rgbaToHexa', () => {
    it('should convert RGBA to HEXA', () => {
      expect(rgbaToHexa('rgba(255, 0, 0, 1)')).toBe('#FF0000FF');
      expect(rgbaToHexa('rgba(0, 255, 0, 0.5)')).toBe('#00FF0080');
      expect(rgbaToHexa('rgba(0, 0, 255, 0)')).toBe('#0000FF00');
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
      const result = convertColor('#FFFFFF', ColorFormat.RGBA);
      expect(result).toBe('rgba(255, 255, 255, 1)');
    });
  
    it('should correctly convert RGBA to HEX', () => {
      const result = convertColor('rgba(255, 255, 255, 1)', ColorFormat.HEX);
      expect(result).toBe('#FFFFFF');
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
      expect(result).toBe('#FF0000FF');
    });
  
    it('should correctly convert HEXA to HSL', () => {
      const result = convertColor('#ff00ff80', ColorFormat.HSL);
      expect(result).toBe('hsl(300, 100%, 50%)');
    });
  
    it('should correctly convert CMYK to HEX', () => {
      const result = convertColor('cmyk(0%, 100%, 0%, 0%)', ColorFormat.HEX);
      expect(result).toBe('#FF00FF');
    });
  
    it('should return the same color when converting to the same format', () => {
      const color = '#FFFFFF';
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

