import { convertColor } from './convertions';
import { getColorFormat } from './format-detection';

import { ColorFormat } from '../types';

/**
 * Generates a stepped color gradient between two colors.
 * This function creates a series of intermediate colors that form a gradient
 * from a starting color to an ending color, with the number of steps.
 * 
 * @param {string} fromColor - The color string representing the start color of the gradient.
 *   This color should be in a format recognized by the `getColorFormat` and `convertColor` functions.
 * @param {string} toColor - The color string representing the end color of the gradient.
 *   This color should also be in a recognized format.
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
const generateSteppedGradient = (fromColor: string, toColor: string, count: number): string[] => {
  const fromColorFormat = getColorFormat(fromColor);
  const toColorFormat = getColorFormat(toColor);

  if (!fromColorFormat || !toColorFormat) {
    throw new Error('Invalid color format');
  }

  const fromRGBA = convertColor(fromColor, ColorFormat.RGBA).match(/\d+(\.\d+)?/g)!.map(Number);
  const toRGBA = convertColor(toColor, ColorFormat.RGBA).match(/\d+(\.\d+)?/g)!.map(Number);
  const step = 1 / (count + 1);

  let intermediateColors = [];

  for (let i = 1; i <= count; i++) {
    const interpolatedColor = fromRGBA.map((start, index) => {
      const end = toRGBA[index];

      return index !== 3
        ? Math.round(start + (end - start) * step * i) 
        : (start + (end - start) * step * i).toFixed(2);
    });

    intermediateColors.push(convertColor(`rgba(${interpolatedColor.join(', ')})`, fromColorFormat));
  }

  return intermediateColors;
};

/**
 * Generates a complex stepped color gradient between multiple colors.
 * This function creates a series of intermediate colors forming a gradient
 * between each pair of colors in the argument list, with specified steps between each pair.
 * 
 * @param args - A list of colors and steps where each color (except the last one) is followed by a number 
 *   indicating the steps to the next color. For example, the call might look like:
 *   generateMultiSteppedGradient("#ff0000", 3, "#ffff00", 4, "#0000ff").
 * 
 * @returns An array of color strings representing the complex gradient including all intermediate colors.
 *   The format of each color in the array is the same as the format of the first color in the input list.
 * 
 * @throws Will throw an error if the arguments don't follow the pattern [color, steps, color, ..., color].
 * 
 * Example usage:
 * generateMultiSteppedGradient("#ff0000", 3, "#ffff00", 4, "#0000ff");
 * // Returns an array including "#ff0000", three intermediate colors to "#ffff00",
 * // "#ffff00" itself, four intermediate colors to "#0000ff", and "#0000ff".
 */
const generateMultiSteppedGradient = (...args: (string | number)[]): string[] => {
  if (args.length < 3 || args.length % 2 === 0) {
    throw new Error('Function must be called with at least one color and one step count, in an interleaved manner.');
  }

  let gradientColors: string[] = [];

  for (let i = 0; i < args.length - 2; i += 2) {
    const fromColor = args[i];
    const steps = args[i + 1];
    const toColor = args[i + 2];

    if (typeof fromColor !== 'string' || typeof steps !== 'number' || typeof toColor !== 'string') {
      throw new Error('Arguments must follow the pattern [color, steps, color, ..., color].');
    }

    const gradientSegment = generateSteppedGradient(fromColor, toColor, steps as number);
    if (i === 0) {
      gradientColors.push(fromColor);
    }
    gradientColors.push(...gradientSegment);
    gradientColors.push(toColor);
  }

  return gradientColors;
};

export {
  generateSteppedGradient,
  generateMultiSteppedGradient,
};
