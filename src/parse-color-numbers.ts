import { convertColor } from './convert-color';
import { getColorFormat } from './get-color-format';

import { ColorFormat, HSL, HSLA, RGB, RGBA } from './types';

/**
 * Converts a given color to an object containing the numerical values of its components.
 * The function supports conversion to RGB, RGBA, HSL, or HSLA format.
 * 
 * @param {string} color - The color string to parse.
 *                          If an invalid color format is provided, white (#FFFFFF) will be used as a fallback.
 * @param {ColorFormat.RGB | ColorFormat.RGBA | ColorFormat.HSL | ColorFormat.HSLA} format - The desired format for the output.
 * 
 * @returns {RGB | RGBA | HSL | HSLA} An object containing the numerical values of the color components.
 *                                     If the input color format was invalid, returns white color values in the specified format.
 */
const parseColorNumbers = (color: string, format: ColorFormat.RGB | ColorFormat.RGBA | ColorFormat.HSL | ColorFormat.HSLA): RGB | RGBA | HSL | HSLA => {
  if (![ColorFormat.RGB, ColorFormat.RGBA, ColorFormat.HSL, ColorFormat.HSLA].some((colorFormat) => colorFormat === format)) {
    throw new Error('Invalid format specified');
  }
  
  const colorFormat = getColorFormat(color);

  // Use white as fallback if color format is invalid
  const validColor = colorFormat ? color : '#FFFFFF';

  
  let convertedColor = convertColor(validColor, format);
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
