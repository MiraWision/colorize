import { getColorFormat } from '../src/tools/format-detection';

import { ColorFormat } from '../src/types';

describe('format-detection', () => {
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

