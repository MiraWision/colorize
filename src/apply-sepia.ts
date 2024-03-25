import { convertColor } from './convert-color';
import { getColorFormat } from './get-color-format';

import { ColorFormat } from './types';

/**
 * Applies a sepia tone effect to the specified color.
 * The sepia effect is achieved by adjusting the Red, Green, and Blue components
 * of the color according to a set formula that simulates the look of sepia-toned photographs.
 * 
 * @param {string} color - The color to which the sepia effect will be applied, specified as a string
 *   in a recognized format (e.g., HEX, RGB, named colors).
 * 
 * @returns {string} - The sepia-toned color, represented in the same format as the input.
 * 
 * @throws {Error} - Throws an error if the input color is in an unrecognized or invalid format.
 * 
 * Example usage:
 * applySepia('#826C34'); // returns a sepia-toned version of the original color.
 */
const applySepia = (color: string): string => {
  const colorFormat = getColorFormat(color);

  if (!colorFormat) {
    throw new Error('Invalid color format');
  }

  let [r, g, b] = convertColor(color, ColorFormat.RGB).match(/\d+/g)!.map(Number);

  r = Math.round(Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189)));
  g = Math.round(Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168)));
  b = Math.round(Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131)));

  return convertColor(`rgb(${[r, g, b].join(', ')})`, colorFormat);
};

export { applySepia };
