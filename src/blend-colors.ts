import { convertColor } from './convert-color';
import { getColorFormat } from './get-color-format';

import { ColorFormat } from './types';

/**
 * Blends two colors together based on a specified weight, producing a new color.
 * The weight determines the contribution of each color to the resulting blend.
 * 
 * @param {string} fromColor - The starting color string in a recognized color format.
 * @param {string} toColor - The ending color string in a recognized color format.
 * @param {number} weight - A decimal number between 0 and 1 representing the weight of the `toColor` in the blend.
 *   A weight of 0 will result in the `fromColor`, a weight of 1 will result in the `toColor`,
 *   and a weight of 0.5 will produce an evenly blended color.
 * 
 * @returns {string} - The blended color in the same format as the `fromColor`.
 * 
 * @throws {Error} - Throws an error if either the starting or ending color is in an invalid format.
 * 
 * Example usage:
 * blendColors('#FF0000', '#0000FF', 0.5); // returns a color string representing the color halfway between red and blue.
 */
const blendColors = (fromColor: string, toColor: string, weight: number): string => {
  const fromColorFormat = getColorFormat(fromColor);
  const toColorFormat = getColorFormat(toColor);

  if (weight < 0 || weight > 1) {
    throw new Error('Invalid weight value');
  }

  if (!fromColorFormat || !toColorFormat) {
    throw new Error('Invalid color format');
  }

  const fromRGB = convertColor(fromColor, ColorFormat.RGB).match(/\d+/g)!.map(Number);
  const toRGB = convertColor(toColor, ColorFormat.RGB).match(/\d+/g)!.map(Number);

  const [r, g, b] = [0, 1, 2].map((i) => Math.round(fromRGB[i] * (1 - weight) + toRGB[i] * weight));

  return convertColor(`rgb(${[r, g, b].join(', ')})`, fromColorFormat);
};

export { blendColors };
