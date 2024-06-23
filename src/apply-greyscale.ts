import { convertColor } from './convert-color';
import { getColorFormat } from './get-color-format';

import { ColorFormat } from './types';

/**
 * Converts a color to its grayscale equivalent using the luminosity method.
 * 
 * @param {string} color - The color in any supported format.
 * 
 * @returns {string} The grayscale equivalent of the color represented in the same format as the input.
 * 
 * Example usage:
 * applyGreyscale('#ff6347'); // Returns a grayscale version of the tomato color.
 */
const applyGreyscale = (color: string): string => {
  const colorFormat = getColorFormat(color);

  if (!colorFormat) {
    throw new Error('Invalid color format');
  }
  
  const rgbColor = convertColor(color, ColorFormat.RGB);
  const [r, g, b] = rgbColor.match(/\d+/g)!.map(Number);

  const grey = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);

  return convertColor(`rgb(${grey}, ${grey}, ${grey})`, colorFormat);
};

export { applyGreyscale };
