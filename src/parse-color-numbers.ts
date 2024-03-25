import { convertColor } from './convert-color';
import { getColorFormat } from './get-color-format';

import { ColorFormat, HSL, HSLA, RGB, RGBA } from './types';

/**
 * Converts a given color to an object containing the numerical values of its components.
 * The function supports conversion to RGB, RGBA, HSL, or HSLA format.
 * 
 * @param {string} color - The color string to parse.
 * @param {ColorFormat.RGB | ColorFormat.RGBA | ColorFormat.HSL | ColorFormat.HSLA} format - The desired format for the output.
 * 
 * @returns {RGB | RGBA | HSL | HSLA} An object containing the numerical values of the color components.
 */
const parseColorNumbers = (color: string, format: ColorFormat.RGB | ColorFormat.RGBA | ColorFormat.HSL | ColorFormat.HSLA): RGB | RGBA | HSL | HSLA => {
  if (![ColorFormat.RGB, ColorFormat.RGBA, ColorFormat.HSL, ColorFormat.HSLA].some((colorFormat) => colorFormat === format)) {
    throw new Error('Invalid format specified');
  }
  
  const colorFormat = getColorFormat(color);

  if (!colorFormat) {
    throw new Error('Invalid color format');
  }

  
  let convertedColor = convertColor(color, format);
  let matches = convertedColor.match(/\d+(\.\d+)?/g);

  if (!matches) {
    throw new Error('Color conversion failed');
  }

  let values = matches.map(Number);

  switch (format) {
    case 'rgb':
    case 'rgba':
      return {
        r: values[0],
        g: values[1],
        b: values[2],
        ...(values.length > 3 && { a: values[3] }),
      };
    case 'hsl':
    case 'hsla':
      return {
        h: values[0],
        s: values[1],
        l: values[2],
        ...(values.length > 3 && { a: values[3] }),
      };
    default:
      throw new Error('Invalid format specified');
  }
};



export { parseColorNumbers };
