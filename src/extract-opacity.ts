import { getColorFormat } from './get-color-format';

import { ColorFormat } from './types';

/**
 * Extracts the color and opacity from a given color string.
 * If the color format does not include an alpha channel, the opacity is returned as 1.
 * Supports HEXA, RGBA, and HSLA color formats.
 * 
 * @param {string} color - The color string to extract opacity from.
 *                          If an invalid color format is provided, white (#FFFFFF) will be used as a fallback.
 * 
 * @returns {{ color: string, opacity: number }} An object containing the color without opacity and the opacity value.
 *                                               If the input color format was invalid, returns white with opacity 1.
 * 
 * Example usage:
 * extractOpacity('#ff000080'); // Returns { color: "#ff0000", opacity: 0.5 }.
 * extractOpacity('invalidColor'); // Returns { color: "#FFFFFF", opacity: 1 }.
 */
const extractOpacity = (color: string): { color: string; opacity: number } => {
  const colorFormat = getColorFormat(color);
  let opacity = 1;

  // Use white as fallback if color format is invalid
  if (!colorFormat) {
    return { color: '#FFFFFF', opacity: 1 };
  }

  switch (colorFormat) {
    case ColorFormat.HEXA:
      opacity = parseInt(color.slice(-2), 16) / 255;
      color = color.slice(0, -2);
      break;
    case ColorFormat.RGBA:
      [, , , opacity] = color.match(/\d+(\.\d+)?/g)!.map(Number);
      color = `rgb(${color.match(/\d+/g)!.slice(0, 3).join(', ')})`;
      break;
    case ColorFormat.HSLA:
      [, , , opacity] = color.match(/\d+(\.\d+)?/g)!.map(Number);
      color = `hsl(${color.match(/\d+/g)!.slice(0, 3).join(', ')})`;
      break;
  }

  return { color, opacity };
};

export { extractOpacity };
