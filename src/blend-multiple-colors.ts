import { convertColor } from './convert-color';
import { getColorFormat } from './get-color-format';
import { ColorFormat } from './types';

interface ColorWeight {
  color: string;
  weight: number;
}

/**
 * Blends multiple colors together based on their specified weights, producing a new color.
 * Each color's weight determines its contribution to the resulting blend.
 * 
 * @param {ColorWeight[]} colorWeights - An array of objects, each containing a `color` string in a recognized color format and a `weight` number.
 *   The weights determine the contribution of each color to the final blend.
 * 
 * @returns {string} - The blended color in the same format as the first color in the array.
 * 
 * @throws {Error} - Throws an error if any color is in an invalid format or if weights are invalid.
 * 
 * Example usage:
 * blendMultipleColors([{ color: '#FF0000', weight: 1 }, { color: '#0000FF', weight: 2 }]); // returns a color string blended from red and blue with blue having twice the weight.
 */
const blendMultipleColors = (colorWeights: ColorWeight[]): string => {
  if (colorWeights.length === 0) {
    throw new Error('The array of color weights must not be empty.');
  }

  // Get the format of the first color for output consistency
  const firstColorFormat = getColorFormat(colorWeights[0].color);
  if (!firstColorFormat) {
    throw new Error('Invalid color format in the first color.');
  }

  // Normalize weights
  const totalWeight = colorWeights.reduce((sum, cw) => sum + cw.weight, 0);

  if (totalWeight <= 0) {
    throw new Error('Total weight must be greater than zero.');
  }

  // Convert all colors to RGB format and blend them
  const blendedRGB = [0, 0, 0];

  colorWeights.forEach(({ color, weight }) => {
    const colorFormat = getColorFormat(color);
    if (!colorFormat) {
      throw new Error(`Invalid color format for color: ${color}`);
    }

    const rgb = convertColor(color, ColorFormat.RGB).match(/\d+/g)!.map(Number);
    const normalizedWeight = weight / totalWeight;

    [0, 1, 2].forEach((i) => {
      blendedRGB[i] += rgb[i] * normalizedWeight;
    });
  });

  const [r, g, b] = blendedRGB.map(Math.round);

  // Convert the blended RGB back to the original format of the first color
  return convertColor(`rgb(${[r, g, b].join(', ')})`, firstColorFormat);
};

export { blendMultipleColors };