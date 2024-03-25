import { getLuminance } from './get-luminance';

/**
 * Determines if a given color is considered light.
 * 
 * @param {string} color - The color in any supported format.
 * 
 * @returns {boolean} True if the color is light, false otherwise.
 * 
 * Example usage:
 * isLight('#ff0000'); // Returns false as red is not considered a light color.
 */
const isLight = (color: string): boolean => {
  return getLuminance(color) > 0.5;
};

export { isLight };
