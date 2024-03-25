import { convertColor } from './convert-color';

import { ColorFormat } from './types';

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

export { getLuminance };
