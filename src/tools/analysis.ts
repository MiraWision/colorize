import { convertColor } from './convertions';

import { ColorFormat } from '../types';

/**
 * Calculates the luminance of a given color.
 * 
 * @param {string} color - The color in any supported format.
 * 
 * @returns {number} The luminance of the color, a value between 0 and 1.
 * 
 * Example usage:
 * getLuminance('#ff0000'); // Returns the luminance of red.
 */
const getLuminance = (color: string): number => {
  const rgbColor = convertColor(color, ColorFormat.RGB);

  const [r, g, b] = rgbColor.match(/\d+/g)!.map(Number).map((v) => {
    v /= 255;

    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

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

export {
  getLuminance,
  isLight,
  isDark,
  calculateContrast,
};
