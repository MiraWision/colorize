import { convertColor } from './convert-color';
import { getColorFormat } from './get-color-format';

import { ColorFormat } from './types';

/**
 * Changes the opacity of a specified color to a new value.
 * 
 * @param {string} color - The color whose opacity will be changed, specified as a string
 *   in a recognized format (e.g., HEX, RGB, HSL, named colors).
 * @param {number} opacity - The new opacity level for the color, a number between 0 and 1.
 *   0 represents full transparency, and 1 represents full opacity.
 * 
 * @returns {string} - The color with adjusted opacity, in the same format as the input.
 * 
 * @throws {Error} - If the input color is in an unrecognized or invalid format, an error is thrown.
 * 
 * Example usage:
 * changeOpacity('#ff0000', 0.5); // Returns a half-transparent red color in HEX format.
 * changeOpacity('rgba(255, 0, 0, 0.8)', 0.3); // Adjusts an RGBA red color to 30% opacity.
 */
const changeOpacity = (color: string, opacity: number): string => {
  const colorFormat = getColorFormat(color);

  if (!colorFormat) {
    throw new Error('Invalid color format');
  }

  let [r, g, b, a] = convertColor(color, ColorFormat.RGBA).match(/\d+(\.\d+)?/g)!.map(Number);

  a = Math.max(0, Math.min(1, opacity));

  return convertColor(`rgba(${[r, g, b, a].join(', ')})`, colorFormat);
};

export { changeOpacity };
