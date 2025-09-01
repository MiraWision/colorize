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
 *   If an invalid color format is provided, white (#FFFFFF) will be used as a fallback.
 * 
 * @returns {string} - The sepia-toned color, represented in the same format as the input.
 *                     If the input color format was invalid, returns the sepia-toned white color in the same format.
 * 
 * Example usage:
 * applySepia('#826C34'); // returns a sepia-toned version of the original color.
 * applySepia('invalidColor'); // uses white as fallback and returns its sepia-toned version.
 */
const applySepia = (color: string): string => {
  const colorFormat = getColorFormat(color);

  // Use white as fallback if color format is invalid
  const validColor = colorFormat ? color : '#FFFFFF';
  const targetFormat = colorFormat || ColorFormat.HEX;

  let [r, g, b] = convertColor(validColor, ColorFormat.RGB).match(/\d+/g)!.map(Number);

  r = Math.round(Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189)));
  g = Math.round(Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168)));
  b = Math.round(Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131)));

  return convertColor(`rgb(${[r, g, b].join(', ')})`, targetFormat);
};

export { applySepia };
