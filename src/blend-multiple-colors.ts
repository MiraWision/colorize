import { Color } from './color';
import { convertColor } from './convert-color';
import { ColorFormat } from './types';

interface ColorWeight {
  color: Color | string;
  weight: number;
}

/**
 * Blends multiple colors together based on their specified weights, producing a new color.
 * Each color's weight determines its contribution to the resulting blend.
 * 
 * @param {ColorWeight[]} colorWeights - An array of objects, each containing a `color` which is the object of Color class or string in a recognized color format and a `weight` number.
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

  let colors: { color: Color, weight: number }[] = colorWeights
    .map(({ color, weight }) => ({ color: typeof color === 'string' ? new Color(color) : color, weight }));

  if (!colors[0].color.format()) {
    throw new Error('Invalid color format in the first color.');
  }

  const totalWeight = colors.reduce((sum, cw) => sum + cw.weight, 0);

  if (totalWeight <= 0) {
    throw new Error('Total weight must be greater than zero.');
  }

  const blendedRGB = [0, 0, 0];

  colors.forEach(({ color, weight }) => {
    if (!color.format()) {
      throw new Error(`Invalid color format for color: ${color}`);
    }

    const rgb = color.rgb().match(/\d+/g)!.map(Number);
    const normalizedWeight = weight / totalWeight;

    [0, 1, 2].forEach((i) => {
      blendedRGB[i] += rgb[i] * normalizedWeight;
    });
  });

  const [r, g, b] = blendedRGB.map(Math.round);

  return convertColor(`rgb(${[r, g, b].join(', ')})`, colors[0].color.format() as ColorFormat);
};

export { blendMultipleColors };
