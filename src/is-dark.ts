import { getLuminance } from './get-luminance';

/**
 * Determines if a given color is considered dark.
 * 
 * @param {string} color - The color in any supported format.
 * 
 * @returns {boolean} True if the color is dark, false otherwise.
 * 
 * Example usage:
 * isDark('#ff0000'); // Returns true as red is considered a dark color.
 */
const isDark = (color: string): boolean => {
  return getLuminance(color) <= 0.5;
};

export { isDark };
