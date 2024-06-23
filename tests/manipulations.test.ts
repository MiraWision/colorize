import { blendColors } from '../src/blend-colors';
import { blendMultipleColors } from '../src/blend-multiple-colors';
import { adjustBrightness } from '../src/adjust-brightness';
import { adjustHue } from '../src/adjust-hue';
import { oppositeColor } from '../src/opposite-color';
import { adjustSaturation } from '../src/adjust-saturation';
import { invertColor } from '../src/invert-color';
import { applySepia } from '../src/apply-sepia';
import { applyGreyscale } from '../src/apply-greyscale';
import { changeOpacity } from '../src/change-opacity';
import { tint } from '../src/tint';
import { shade } from '../src/shade';

describe('manipulations', () => {
  describe('blendColors', () => {
    it('should correctly blend two colors', () => {
      const blend = blendColors('rgb(255, 0, 0)', 'rgb(0, 0, 255)', 0.5);
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

  describe('blendMultipleColors', () => {
    it('should blend two colors with equal weights', () => {
      const result = blendMultipleColors([{ color: '#ff0000', weight: 1 }, { color: '#0000ff', weight: 1 }]);
      expect(result).toBe('#800080');
    });
  
    it('should blend three colors with different weights', () => {
      const result = blendMultipleColors([{ color: '#ff0000', weight: 1 }, { color: '#00ff00', weight: 2 }, { color: '#0000ff', weight: 3 }]);
      expect(result).toBe('#2b5580');
    });
  
    it('should throw an error for an empty array', () => {
      expect(() => blendMultipleColors([])).toThrow('The array of color weights must not be empty.');
    });
  
    it('should throw an error for invalid color formats', () => {
      expect(() => blendMultipleColors([{ color: 'invalidColor', weight: 1 }])).toThrow('Invalid color format in the first color.');
    });
  });

  describe('adjustHue Function', () => {
    test('should adjust the hue of a color by the specified amount and wrap around 360 degrees', () => {
      expect(adjustHue('#00ff00', 30)).toBe('#00ff80');
      expect(adjustHue('#ff0000', 45)).toBe('#ffbf00');
    });
  
    test('should handle negative hue adjustments and correctly wrap around', () => {
      expect(adjustHue('#ff0000', -45)).toBe('#ff00bf');
      expect(adjustHue('hsl(10, 100%, 50%)', -20)).toBe('hsl(350, 100%, 50%)');
    });
  
    test('should maintain the correct format of the input color', () => {
      expect(adjustHue('rgb(255, 0, 0)', 60)).toBe('rgb(255, 255, 0)');
      expect(adjustHue('#00ff00', -120)).toBe('#ff0000');
    });
  
    test('should throw an error for an invalid color format', () => {
      expect(() => adjustHue('invalidColor', 30)).toThrow('Invalid color format');
    });
  });
  
  describe('oppositeColor Function', () => {
    test('should return the opposite color by adjusting the hue by 180 degrees', () => {
      expect(oppositeColor('#00ff00')).toBe('#ff00ff');
      expect(oppositeColor('#ff0000')).toBe('#00ffff');
    });
  
    test('should maintain the correct format of the input color', () => {
      expect(oppositeColor('rgb(255, 0, 0)')).toBe('rgb(0, 255, 255)');
      expect(oppositeColor('hsl(180, 100%, 50%)')).toBe('hsl(0, 100%, 50%)');
    });
  
    test('should handle the edge case where hue adjustment wraps around 360 degrees', () => {
      expect(oppositeColor('hsl(10, 100%, 50%)')).toBe('hsl(190, 100%, 50%)');
      expect(oppositeColor('hsl(350, 100%, 50%)')).toBe('hsl(170, 100%, 50%)');
    });
  
    test('should throw an error for an invalid color format', () => {
      expect(() => oppositeColor('invalidColor')).toThrow('Invalid color format');
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
      expect(tint('#ff0000', 1)).toBe('#ffffff');
    });
  
    it('returns the same color when the weight is 0%', () => {
      expect(tint('#ff0000', 0)).toBe('#ff0000');
    });
  
    it('returns a lighter color when the weight is 50%', () => {
      expect(tint('#0000ff', 0.5)).toBe('#8080ff');
    });
  });
  
  describe('shade', () => {
    it('returns black when the weight is 100%', () => {
      expect(shade('#00ff00', 1)).toBe('#000000');
    });
  
    it('returns the same color when the weight is 0%', () => {
      expect(shade('#00ff00', 0)).toBe('#00ff00');
    });
  
    it('returns a darker color when the weight is 50%', () => {
      expect(shade('#00ff00', 0.5)).toBe('#008000');
    });
  });

  describe('applyGreyscale', () => {
    it('converts pure red to its grayscale equivalent', () => {
      expect(applyGreyscale('#ff0000')).toBe('#363636');
    });
  
    it('converts pure green to its grayscale equivalent', () => {
      expect(applyGreyscale('#00ff00')).toBe('#b6b6b6');
    });
  
    it('converts pure blue to its grayscale equivalent', () => {
      expect(applyGreyscale('#0000ff')).toBe('#121212');
    });
  
    it('retains a gray color as is', () => {
      const greyColor = 'rgb(128, 128, 128)';
      expect(applyGreyscale(greyColor)).toBe(greyColor);
    });
  });
});
