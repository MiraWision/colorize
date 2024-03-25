import { getLuminance } from './get-luminance';

/**
 * Calculates the contrast ratio between two colors.
 * 
 * @param {string} color1 - The first color in any supported format.
 * @param {string} color2 - The second color in any supported format.
 * 
 * @returns {number} The contrast ratio between the two colors.
 * 
 * Example usage:
 * calculateContrast('#ffffff', '#000000'); // Returns 21 (maximum contrast)
 */
const calculateContrast = (color1: string, color2: string): number => {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);

  const l1 = Math.max(luminance1, luminance2);
  const l2 = Math.min(luminance1, luminance2);

  return (l1 + 0.05) / (l2 + 0.05);
};

export { calculateContrast };
