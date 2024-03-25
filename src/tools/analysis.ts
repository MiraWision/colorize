import { convertColor } from './convertions';
import { getColorFormat } from './format-detection';

import { ColorFormat, HSL, HSLA, RGB, RGBA } from '../types';

/**
 * Extracts the color and opacity from a given color string.
 * If the color format does not include an alpha channel, the opacity is returned as 1.
 * Supports HEXA, RGBA, and HSLA color formats.
 * 
 * @param {string} color - The color string to extract opacity from.
 * 
 * @returns {{ color: string, opacity: number }} An object containing the color without opacity and the opacity value.
 * 
 * @throws {Error} - If the input color is in an unrecognized or invalid format, an error is thrown.
 * 
 * Example usage:
 * extractOpacity('#ff000080'); // Returns { color: "#ff0000", opacity: 0.5 }.
 */
const extractOpacity = (color: string): { color: string; opacity: number } => {
  const colorFormat = getColorFormat(color);
  let opacity = 1;

  if (!colorFormat) {
    throw new Error('Invalid color format');
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

/**
 * Calculates the luminance of a given color.
 * 
 * @param {string} color - The color in any supported format.
 * 
 * @returns {number} The luminance of the color, a value between 0 and 1.
 * 
 * Example usage:
 * getLuminance('#ff0000'); // Returns the luminance of red.
 */
const getLuminance = (color: string): number => {
  const rgbColor = convertColor(color, ColorFormat.RGB);

  const [r, g, b] = rgbColor.match(/\d+/g)!.map(Number).map((v) => {
    v /= 255;

    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Determines if a given color is considered light.
 * 
 * @param {string} color - The color in any supported format.
 * 
 * @returns {boolean} True if the color is light, false otherwise.
 * 
 * Example usage:
 * isLight('#ff0000'); // Returns false as red is not considered a light color.
 */
const isLight = (color: string): boolean => {
  return getLuminance(color) > 0.5;
};

/**
 * Determines if a given color is considered dark.
 * 
 * @param {string} color - The color in any supported format.
 * 
 * @returns {boolean} True if the color is dark, false otherwise.
 * 
 * Example usage:
 * isDark('#ff0000'); // Returns true as red is considered a dark color.
 */
const isDark = (color: string): boolean => {
  return getLuminance(color) <= 0.5;
};

/**
 * Calculates the contrast ratio between two colors.
 * 
 * @param {string} color1 - The first color in any supported format.
 * @param {string} color2 - The second color in any supported format.
 * 
 * @returns {number} The contrast ratio between the two colors.
 * 
 * Example usage:
 * calculateContrast('#ffffff', '#000000'); // Returns 21 (maximum contrast)
 */
const calculateContrast = (color1: string, color2: string): number => {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);

  const l1 = Math.max(luminance1, luminance2);
  const l2 = Math.min(luminance1, luminance2);

  return (l1 + 0.05) / (l2 + 0.05);
};

export {
  extractOpacity,
  parseColorNumbers,
  getLuminance,
  isLight,
  isDark,
  calculateContrast,
};
