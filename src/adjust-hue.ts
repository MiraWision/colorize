import { convertColor } from './convert-color';
import { getColorFormat } from './get-color-format';
import { ColorFormat } from './types';

/**
 * Adjusts the hue of a given color by a specified amount.
 * 
 * @param {string} color - The color to be adjusted, provided in a format recognized by `getColorFormat`.
 *                          This could be in formats like HEX, RGB, or named colors, among others.
 *                          If an invalid color format is provided, white (#FFFFFF) will be used as a fallback.
 * @param {number} amount - The amount to adjust the hue by. This value can be positive (to increase hue)
 *                          or negative (to decrease hue). The hue value is constrained between 0 and 360 degrees.
 * 
 * @returns {string} - The color with adjusted hue, in the same format as the input color.
 *                     If the input color format was invalid, returns the adjusted white color in the same format.
 * 
 * Example usage:
 * adjustHue('#00FF00', 30); // changes the hue of a bright green color.
 * adjustHue('rgb(255, 0, 0)', -45); // changes the hue of a red color.
 * adjustHue('invalidColor', 60); // uses white as fallback and adjusts its hue.
 */
const adjustHue = (color: string, amount: number): string => {
  const colorFormat = getColorFormat(color);

  // Use white as fallback if color format is invalid
  const validColor = colorFormat ? color : '#FFFFFF';
  const targetFormat = colorFormat || ColorFormat.HEX;

  const hslColor = convertColor(validColor, ColorFormat.HSL);

  let [h, s, l] = hslColor.match(/\d+/g)!.map(Number);

  h = (h + amount) % 360;
  if (h < 0) h += 360;

  return convertColor(`hsl(${h}, ${s}%, ${l}%)`, targetFormat);
};

export { adjustHue };
