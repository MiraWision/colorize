import { convertColor } from './convert-color';
import { getColorFormat } from './get-color-format';

import { ColorFormat } from './types';

/**
 * Inverts the given color, producing its opposite in the color spectrum.
 * 
 * @param {string} color - The color to be inverted, specified as a string in a recognized format.
 *   This could be a hexadecimal code, RGB(A) notation, or any other format supported by `getColorFormat`.
 *   If an invalid color format is provided, white (#FFFFFF) will be used as a fallback.
 * 
 * @returns {string} - The inverted color, represented in the same format as the input.
 *                     If the input color format was invalid, returns the inverted white color in the same format.
 * 
 * Example usage:
 * invertColor('#FFFFFF'); // returns '#000000', inverting white to black.
 * invertColor('rgb(255, 0, 0)'); // returns 'rgb(0, 255, 255)', inverting red to cyan.
 * invertColor('invalidColor'); // uses white as fallback and returns '#000000'.
 */
const invertColor = (color: string): string => {
  const colorFormat = getColorFormat(color);

  // Use white as fallback if color format is invalid
  const validColor = colorFormat ? color : '#FFFFFF';
  const targetFormat = colorFormat || ColorFormat.HEX;

  let [r, g, b] = convertColor(validColor, ColorFormat.RGB).match(/\d+/g)!.map(Number);

  r = 255 - r;
  g = 255 - g;
  b = 255 - b;

  return convertColor(`rgb(${[r, g, b].join(', ')})`, targetFormat);
};

export { invertColor };
