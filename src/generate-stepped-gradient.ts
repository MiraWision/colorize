import { Color } from './color';
import { convertColor } from './convert-color';

import { ColorFormat } from './types';

/**
 * Generates a stepped color gradient between two colors.
 * This function creates a series of intermediate colors that form a gradient
 * from a starting color to an ending color, with the number of steps.
 * 
 * @param {Color | string} fromColor - The color string representing the start color of the gradient.
 *   This color should be the object of Color class or a string in format recognized by the `getColorFormat` and `convertColor` functions.
 * @param {Color | string} toColor - The color string representing the end color of the gradient.
 *   his color should be the object of Color class or a string in format recognized by the `getColorFormat` and `convertColor` functions.
 * @param {number} count - The number of intermediate colors to generate in the gradient.
 *   The total number of colors in the returned array will be equal to this count.
 * 
 * @returns {string[]} An array of color strings representing the stepped gradient from the starting color to the ending color.
 * Each color in the array is converted back to the format of the `fromColor`.
 * 
 * @throws {Error} Throws an error if either the starting or ending color is in an invalid format.
 * 
 * Example usage:
 * generateSteppedGradient('#FF0000', '#00FF00', 5); // returns an array of 5 intermediate colors in hexadecimal format between red and green.
 */
const generateSteppedGradient = (fromColor: Color | string, toColor: Color | string, count: number): string[] => {
  if (typeof fromColor === 'string') {
    fromColor = new Color(fromColor);
  }

  if (typeof toColor === 'string') {
    toColor = new Color(toColor);
  }

  if (!fromColor.format() || !toColor.format()) {
    throw new Error('Invalid color format');
  }

  const fromRGBA = fromColor.rgba().match(/\d+(\.\d+)?/g)!.map(Number);
  const toRGBA = toColor.rgba().match(/\d+(\.\d+)?/g)!.map(Number);
  const step = 1 / (count + 1);

  let intermediateColors = [];

  for (let i = 1; i <= count; i++) {
    const interpolatedColor = fromRGBA.map((start, index) => {
      const end = toRGBA[index];

      return index !== 3
        ? Math.round(start + (end - start) * step * i) 
        : (start + (end - start) * step * i).toFixed(2);
    });

    intermediateColors.push(convertColor(`rgba(${interpolatedColor.join(', ')})`, fromColor.format() as ColorFormat));
  }

  return intermediateColors;
};

export { generateSteppedGradient };
