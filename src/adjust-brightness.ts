import { convertColor } from './convert-color';
import { getColorFormat } from './get-color-format';

import { ColorFormat } from './types';

/**
 * Adjusts the brightness of a given color by a specified amount.
 * 
 * @param {string} color - The color to adjust, in a recognized color format.
 *                          If an invalid color format is provided, white (#FFFFFF) will be used as a fallback.
 * @param {number} amount - The amount to adjust the brightness by. This value can be positive (to increase brightness)
 *                          or negative (to decrease brightness). The adjusted lightness is kept within the 0-100 range.
 * 
 * @returns {string} - The adjusted color, converted back to its original format.
 *                     If the input color format was invalid, returns the adjusted white color in the same format.
 * 
 * Example usage:
 * adjustBrightness('#00FF00', -20); // makes a bright green color darker
 * adjustBrightness('rgb(255, 0, 0)', 10); // makes a red color brighter
 * adjustBrightness('invalidColor', 10); // uses white as fallback and adjusts its brightness
 */
const adjustBrightness = (color: string, amount: number): string => {
  const colorFormat = getColorFormat(color);

  // Use white as fallback if color format is invalid
  const validColor = colorFormat ? color : '#FFFFFF';
  const targetFormat = colorFormat || ColorFormat.HEX;

  const hslColor = convertColor(validColor, ColorFormat.HSL);

  let [h, s, l] = hslColor.match(/\d+/g)!.map(Number);

  l = Math.max(0, Math.min(100, l + amount));

  return convertColor(`hsl(${h}, ${s}%, ${l}%)`, targetFormat);
};

export { adjustBrightness };
