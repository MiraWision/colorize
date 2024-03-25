import { convertColor } from './convert-color';
import { getColorFormat } from './get-color-format';

import { ColorFormat } from './types';

/**
 * Inverts the given color, producing its opposite in the color spectrum.
 * 
 * @param {string} color - The color to be inverted, specified as a string in a recognized format.
 *   This could be a hexadecimal code, RGB(A) notation, or any other format supported by `getColorFormat`.
 * 
 * @returns {string} - The inverted color, represented in the same format as the input.
 * 
 * @throws {Error} - Throws an error if the input color is in an unrecognized or invalid format.
 * 
 * Example usage:
 * invertColor('#FFFFFF'); // returns '#000000', inverting white to black.
 * invertColor('rgb(255, 0, 0)'); // returns 'rgb(0, 255, 255)', inverting red to cyan.
 */
const invertColor = (color: string): string => {
  const colorFormat = getColorFormat(color);

  if (!colorFormat) {
    throw new Error('Invalid color format');
  }

  let [r, g, b] = convertColor(color, ColorFormat.RGB).match(/\d+/g)!.map(Number);

  r = 255 - r;
  g = 255 - g;
  b = 255 - b;

  return convertColor(`rgb(${[r, g, b].join(', ')})`, colorFormat);
};

export { invertColor };
