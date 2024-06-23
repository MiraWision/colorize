import { Color } from './color';
import { getLuminance } from './get-luminance';

/**
 * Calculates the contrast ratio between two colors.
 * 
 * @param {Color | string} color1 - The object of Color class or the first color string in a recognized color format.
 * @param {Color | string} color2 - The object of Color class or the second color string in a recognized color format.
 * 
 * @returns {number} The contrast ratio between the two colors.
 * 
 * Example usage:
 * calculateContrast('#ffffff', '#000000'); // Returns 21 (maximum contrast)
 */
const calculateContrast = (color1: Color | string, color2: Color | string): number => {
  if (typeof color1 === 'string') {
    color1 = new Color(color1);
  }

  if (typeof color2 === 'string') {
    color2 = new Color(color2);
  }

  const luminance1 = color1.luminance();
  const luminance2 = color2.luminance();

  const l1 = Math.max(luminance1, luminance2);
  const l2 = Math.min(luminance1, luminance2);

  return (l1 + 0.05) / (l2 + 0.05);
};

export { calculateContrast };
