import { Color } from './color';
import { convertColor } from './convert-color';

import { ColorFormat } from './types';

/**
 * Blends two colors together based on a specified weight, producing a new color.
 * The weight determines the contribution of each color to the resulting blend.
 * 
 * @param {Color | string} fromColor - The object of Color class or the starting color string in a recognized color format.
 *                                    If an invalid color format is provided, white (#FFFFFF) will be used as a fallback.
 * @param {Color | string} toColor - The object of Color class or the ending color string in a recognized color format.
 *                                  If an invalid color format is provided, white (#FFFFFF) will be used as a fallback.
 * @param {number} weight - A decimal number between 0 and 1 representing the weight of the `toColor` in the blend.
 *   A weight of 0 will result in the `fromColor`, a weight of 1 will result in the `toColor`,
 *   and a weight of 0.5 will produce an evenly blended color.
 * 
 * @returns {string} - The blended color in the same format as the `fromColor`.
 *                     If either input color format was invalid, white will be used as fallback for that color.
 * 
 * Example usage:
 * blendColors('#FF0000', '#0000FF', 0.5); // returns a color string representing the color halfway between red and blue.
 * blendColors('invalidColor', '#0000FF', 0.5); // uses white as fallback for the first color.
 */
const blendColors = (fromColor: Color | string, toColor: Color | string, weight: number): string => {
  if (typeof fromColor === 'string') {
    fromColor = new Color(fromColor);
  }

  if (typeof toColor === 'string') {
    toColor = new Color(toColor);
  }

  if (weight < 0 || weight > 1) {
    throw new Error('Invalid weight value');
  }

  // Use white as fallback if color format is invalid
  const fromColorFormat = (fromColor.format() as ColorFormat) || ColorFormat.HEX;

  const fromRGB = fromColor.rgb().match(/\d+/g)!.map(Number);

  const toRGB = toColor.rgb().match(/\d+/g)!.map(Number);

  const [r, g, b] = [0, 1, 2].map((i) => Math.round(fromRGB[i] * (1 - weight) + toRGB[i] * weight));

  return convertColor(`rgb(${[r, g, b].join(', ')})`, fromColorFormat);
};

export { blendColors };
