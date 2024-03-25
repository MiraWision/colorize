import { 
  blendColors,
  adjustBrightness,
  adjustSaturation,
  invertColor,
  applySepia,
  changeOpacity,
  tint,
  shade,
  applyGreyscale,
} from '../src/tools/manipulations';

describe('manipulations', () => {
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

  describe('tint', () => {
    it('returns white when the weight is 100%', () => {
      expect(tint('#FF0000', 1)).toBe('#FFFFFF');
    });
  
    it('returns the same color when the weight is 0%', () => {
      expect(tint('#FF0000', 0)).toBe('#FF0000');
    });
  
    it('returns a lighter color when the weight is 50%', () => {
      expect(tint('#0000FF', 0.5)).toBe('#8080FF');
    });
  });
  
  describe('shade', () => {
    it('returns black when the weight is 100%', () => {
      expect(shade('#00FF00', 1)).toBe('#000000');
    });
  
    it('returns the same color when the weight is 0%', () => {
      expect(shade('#00FF00', 0)).toBe('#00FF00');
    });
  
    it('returns a darker color when the weight is 50%', () => {
      expect(shade('#00FF00', 0.5)).toBe('#008000');
    });
  });

  describe('applyGreyscale', () => {
    it('converts pure red to its grayscale equivalent', () => {
      expect(applyGreyscale('#ff0000')).toBe('rgb(54, 54, 54)');
    });
  
    it('converts pure green to its grayscale equivalent', () => {
      expect(applyGreyscale('#00ff00')).toBe('rgb(182, 182, 182)');
    });
  
    it('converts pure blue to its grayscale equivalent', () => {
      expect(applyGreyscale('#0000ff')).toBe('rgb(18, 18, 18)');
    });
  
    it('retains a gray color as is', () => {
      const greyColor = 'rgb(128, 128, 128)';
      expect(applyGreyscale(greyColor)).toBe(greyColor);
    });
  });
});
