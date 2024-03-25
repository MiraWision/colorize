import { convertColor } from './convert-color';
import { getColorFormat } from './get-color-format';

import { ColorFormat } from './types';

/**
 * Adjusts the brightness of a given color by a specified amount.
 * 
 * @param {string} color - The color to adjust, in a recognized color format.
 * @param {number} amount - The amount to adjust the brightness by. This value can be positive (to increase brightness)
 *                          or negative (to decrease brightness). The adjusted lightness is kept within the 0-100 range.
 * 
 * @returns {string} - The adjusted color, converted back to its original format.
 * 
 * @throws {Error} - Throws an error if the color is in an invalid format, as determined by `getColorFormat`.
 * 
 * Example usage:
 * adjustBrightness('#00FF00', -20); // makes a bright green color darker
 * adjustBrightness('rgb(255, 0, 0)', 10); // makes a red color brighter
 */
const adjustBrightness = (color: string, amount: number): string => {
  const colorFormat = getColorFormat(color);

  if (!colorFormat) {
    throw new Error('Invalid color format');
  }

  const hslColor = convertColor(color, ColorFormat.HSL);

  let [h, s, l] = hslColor.match(/\d+/g)!.map(Number);

  l = Math.max(0, Math.min(100, l + amount));

  return convertColor(`hsl(${h}, ${s}%, ${l}%)`, colorFormat);
};

export { adjustBrightness };
