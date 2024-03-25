import { convertColor } from './convert-color';

import { ColorFormat } from './types';

/**
 * Converts a color to its grayscale equivalent using the luminosity method.
 * 
 * @param {string} color - The color in any supported format.
 * 
 * @returns {string} The grayscale equivalent of the color in RGB format.
 * 
 * Example usage:
 * applyGreyscale('#ff6347'); // Returns a grayscale version of the tomato color.
 */
const applyGreyscale = (color: string): string => {
  const rgbColor = convertColor(color, ColorFormat.RGB);
  const [r, g, b] = rgbColor.match(/\d+/g)!.map(Number);

  const grey = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);

  return `rgb(${grey}, ${grey}, ${grey})`;
};

export { applyGreyscale };
