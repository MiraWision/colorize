import { convertColor } from './convert-color';
import { ColorFormat } from './types';

/**
 * Generates a random color in the specified format.
 * 
 * @param {ColorFormat} format - The desired color format (hex, hexa, rgb, rgba, hsl, hsla, hsv, cmyk).
 *                               Default is 'hex'.
 * 
 * @returns {string} - The random color in the specified format.
 * 
 * Example usage:
 * randomColor(); // Returns a random color in HEX format.
 * randomColor(ColorFormat.RGB); // Returns a random color in RGB format.
 */
const randomColor = (format: ColorFormat = ColorFormat.HEX): string => {
  const getRandomInt = (max: number) => Math.floor(Math.random() * (max + 1));

  const r = getRandomInt(255);
  const g = getRandomInt(255);
  const b = getRandomInt(255);
  const a = Math.random().toFixed(2);

  const baseColor = `rgba(${r}, ${g}, ${b}, ${a})`;

  return convertColor(baseColor, format);
};

export { randomColor };
