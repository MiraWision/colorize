import { convertColor } from './convert-color';
import { getColorFormat } from './get-color-format';

import { ColorFormat } from './types';

/**
 * Converts a color to its grayscale equivalent using the luminosity method.
 * 
 * @param {string} color - The color in any supported format.
 *                          If an invalid color format is provided, white (#FFFFFF) will be used as a fallback.
 * 
 * @returns {string} The grayscale equivalent of the color represented in the same format as the input.
 *                   If the input color format was invalid, returns the grayscale version of white in the same format.
 * 
 * Example usage:
 * applyGreyscale('#ff6347'); // Returns a grayscale version of the tomato color.
 * applyGreyscale('invalidColor'); // Uses white as fallback and returns its grayscale version.
 */
const applyGreyscale = (color: string): string => {
  const colorFormat = getColorFormat(color);

  // Use white as fallback if color format is invalid
  const validColor = colorFormat ? color : '#FFFFFF';
  const targetFormat = colorFormat || ColorFormat.HEX;
  
  const rgbColor = convertColor(validColor, ColorFormat.RGB);
  const [r, g, b] = rgbColor.match(/\d+/g)!.map(Number);

  const grey = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);

  return convertColor(`rgb(${grey}, ${grey}, ${grey})`, targetFormat);
};

export { applyGreyscale };
