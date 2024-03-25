import { convertColor } from './convert-color';
import { getColorFormat } from './get-color-format';

import { ColorFormat } from './types';

/**
 * Adjusts the saturation of a given color by a specified amount.
 * 
 * @param {string} color - The color to be adjusted, provided in a format recognized by `getColorFormat`.
 *                          This could be in formats like HEX, RGB, or named colors, among others.
 * @param {number} amount - The amount to adjust the saturation by. This value can be positive (to increase saturation)
 *                          or negative (to decrease saturation). The final saturation value is constrained
 *                          between 0% (completely desaturated) and 100% (fully saturated).
 * 
 * @returns {string} - The color with adjusted saturation, in the same format as the input color.
 * 
 * @throws {Error} - If the input color's format is invalid or unrecognized, an error is thrown.
 * 
 * Example usage:
 * adjustSaturation('#00FF00', -20); // decreases the saturation of a bright green color, making it more muted.
 * adjustSaturation('rgb(255, 0, 0)', 20); // increases the saturation of a red color, making it more vivid.
 */
const adjustSaturation = (color: string, amount: number): string => {
  const colorFormat = getColorFormat(color);

  if (!colorFormat) {
    throw new Error('Invalid color format');
  }

  const hslColor = convertColor(color, ColorFormat.HSL);

  let [h, s, l] = hslColor.match(/\d+/g)!.map(Number);

  s = Math.max(0, Math.min(100, s + amount));

  return convertColor(`hsl(${h}, ${s}%, ${l}%)`, colorFormat);
};

export { adjustSaturation };
