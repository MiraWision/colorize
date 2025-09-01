import { convertColor } from './convert-color';
import { getColorFormat } from './get-color-format';

import { ColorFormat } from './types';

/**
 * Adjusts the saturation of a given color by a specified amount.
 * 
 * @param {string} color - The color to be adjusted, provided in a format recognized by `getColorFormat`.
 *                          This could be in formats like HEX, RGB, or named colors, among others.
 *                          If an invalid color format is provided, white (#FFFFFF) will be used as a fallback.
 * @param {number} amount - The amount to adjust the saturation by. This value can be positive (to increase saturation)
 *                          or negative (to decrease saturation). The final saturation value is constrained
 *                          between 0% (completely desaturated) and 100% (fully saturated).
 * 
 * @returns {string} - The color with adjusted saturation, in the same format as the input color.
 *                     If the input color format was invalid, returns the adjusted white color in the same format.
 * 
 * Example usage:
 * adjustSaturation('#00FF00', -20); // decreases the saturation of a bright green color, making it more muted.
 * adjustSaturation('rgb(255, 0, 0)', 20); // increases the saturation of a red color, making it more vivid.
 * adjustSaturation('invalidColor', 10); // uses white as fallback and adjusts its saturation.
 */
const adjustSaturation = (color: string, amount: number): string => {
  const colorFormat = getColorFormat(color);

  // Use white as fallback if color format is invalid
  const validColor = colorFormat ? color : '#FFFFFF';
  const targetFormat = colorFormat || ColorFormat.HEX;

  const hslColor = convertColor(validColor, ColorFormat.HSL);

  let [h, s, l] = hslColor.match(/\d+/g)!.map(Number);

  s = Math.max(0, Math.min(100, s + amount));

  return convertColor(`hsl(${h}, ${s}%, ${l}%)`, targetFormat);
};

export { adjustSaturation };
