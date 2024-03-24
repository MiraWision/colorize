import { convertColor } from './convertions';
import { getColorFormat } from './validations';

import { ColorFormat, HSL, HSLA, RGB, RGBA } from '../types';

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

  const fromRGB = convertColor(fromColor, ColorFormat.RGB).match(/\d+/g)!.map(Number);
  const toRGB = convertColor(toColor, ColorFormat.RGB).match(/\d+/g)!.map(Number);
  const step = 1 / (count + 1);

  let intermediateColors = [];

  for (let i = 1; i <= count; i++) {
    const interpolatedColor = fromRGB.map((start, index) => {
      const end = toRGB[index];
      return Math.round(start + (end - start) * step * i);
    });

    intermediateColors.push(convertColor(`rgb(${interpolatedColor.join(', ')})`, fromColorFormat));
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
 *   generateComplexGradient("#ff0000", 3, "#ffff00", 4, "#0000ff").
 * 
 * @returns An array of color strings representing the complex gradient including all intermediate colors.
 *   The format of each color in the array is the same as the format of the first color in the input list.
 * 
 * @throws Will throw an error if the arguments don't follow the pattern [color, steps, color, ..., color].
 * 
 * Example usage:
 * generateComplexGradient("#ff0000", 3, "#ffff00", 4, "#0000ff");
 * // Returns an array including "#ff0000", three intermediate colors to "#ffff00",
 * // "#ffff00" itself, four intermediate colors to "#0000ff", and "#0000ff".
 */
const generateComplexGradient = (...args: (string | number)[]): string[] => {
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

/**
 * Blends two colors together based on a specified weight, producing a new color.
 * The weight determines the contribution of each color to the resulting blend.
 * 
 * @param {string} fromColor - The starting color string in a recognized color format.
 * @param {string} toColor - The ending color string in a recognized color format.
 * @param {number} weight - A decimal number between 0 and 1 representing the weight of the `toColor` in the blend.
 *   A weight of 0 will result in the `fromColor`, a weight of 1 will result in the `toColor`,
 *   and a weight of 0.5 will produce an evenly blended color.
 * 
 * @returns {string} - The blended color in the same format as the `fromColor`.
 * 
 * @throws {Error} - Throws an error if either the starting or ending color is in an invalid format.
 * 
 * Example usage:
 * blendColors('#FF0000', '#0000FF', 0.5); // returns a color string representing the color halfway between red and blue.
 */
const blendColors = (fromColor: string, toColor: string, weight: number): string => {
  const fromColorFormat = getColorFormat(fromColor);
  const toColorFormat = getColorFormat(toColor);

  if (!fromColorFormat || !toColorFormat) {
    throw new Error('Invalid color format');
  }

  const fromRGB = convertColor(fromColor, ColorFormat.RGB).match(/\d+/g)!.map(Number);
  const toRGB = convertColor(toColor, ColorFormat.RGB).match(/\d+/g)!.map(Number);

  const [r, g, b] = [0, 1, 2].map((i) => Math.round(fromRGB[i] * (1 - weight) + toRGB[i] * weight));

  return convertColor(`rgb(${[r, g, b].join(', ')})`, fromColorFormat);
};

/**
 * Adjusts the brightness of a given color by a specified amount.
 * 
 * @param {string} color - The color to adjust, in a recognized color format.
 * @param {number} amount - The amount to adjust the brightness by. This value can be positive (to increase brightness)
 *                          or negative (to decrease brightness). The adjusted lightness is kept within the 0-100 range.
 * 
 * @returns {string} - The adjusted color, converted back to its original format.
 * 
 * @throws {Error} - Throws an error if the color is in an invalid format, as determined by `getColorFormat`.
 * 
 * Example usage:
 * adjustBrightness('#00FF00', -20); // makes a bright green color darker
 * adjustBrightness('rgb(255, 0, 0)', 10); // makes a red color brighter
 */
const adjustBrightness = (color: string, amount: number): string => {
  const colorFormat = getColorFormat(color);

  if (!colorFormat) {
    throw new Error('Invalid color format');
  }

  const hslColor = convertColor(color, ColorFormat.HSL);

  let [h, s, l] = hslColor.match(/\d+/g)!.map(Number);

  l = Math.max(0, Math.min(100, l + amount));

  return convertColor(`hsl(${h}, ${s}%, ${l}%)`, colorFormat);
};

/**
 * Adjusts the saturation of a given color by a specified amount.
 * 
 * @param {string} color - The color to be adjusted, provided in a format recognized by `getColorFormat`.
*                           This could be in formats like HEX, RGB, or named colors, among others.
 * @param {number} amount - The amount to adjust the saturation by. This value can be positive (to increase saturation)
 *                          or negative (to decrease saturation). The final saturation value is constrained
 *                          between 0% (completely desaturated) and 100% (fully saturated).
 * 
 * @returns {string} - The color with adjusted saturation, in the same format as the input color.
 * 
 * @throws {Error} - If the input color's format is invalid or unrecognized, an error is thrown.
 * 
 * Example usage:
 * adjustSaturation('#00FF00', -20); // decreases the saturation of a bright green color, making it more muted.
 * adjustSaturation('rgb(255, 0, 0)', 20); // increases the saturation of a red color, making it more vivid.
 */
const adjustSaturation = (color: string, amount: number): string => {
  const colorFormat = getColorFormat(color);

  if (!colorFormat) {
    throw new Error('Invalid color format');
  }

  const hslColor = convertColor(color, ColorFormat.HSL);

  let [h, s, l] = hslColor.match(/\d+/g)!.map(Number);

  s = Math.max(0, Math.min(100, s + amount));

  return convertColor(`hsl(${h}, ${s}%, ${l}%)`, colorFormat);
};

/**
 * Inverts the given color, producing its opposite in the color spectrum.
 * 
 * @param {string} color - The color to be inverted, specified as a string in a recognized format.
 *   This could be a hexadecimal code, RGB(A) notation, or any other format supported by `getColorFormat`.
 * 
 * @returns {string} - The inverted color, represented in the same format as the input.
 * 
 * @throws {Error} - Throws an error if the input color is in an unrecognized or invalid format.
 * 
 * Example usage:
 * invertColor('#FFFFFF'); // returns '#000000', inverting white to black.
 * invertColor('rgb(255, 0, 0)'); // returns 'rgb(0, 255, 255)', inverting red to cyan.
 */
const invertColor = (color: string): string => {
  const colorFormat = getColorFormat(color);

  if (!colorFormat) {
    throw new Error('Invalid color format');
  }

  let [r, g, b] = convertColor(color, ColorFormat.RGB).match(/\d+/g)!.map(Number);

  r = 255 - r;
  g = 255 - g;
  b = 255 - b;

  return convertColor(`rgb(${[r, g, b].join(', ')})`, colorFormat);
};

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

/**
 * Changes the opacity of a specified color to a new value.
 * 
 * @param {string} color - The color whose opacity will be changed, specified as a string
 *   in a recognized format (e.g., HEX, RGB, HSL, named colors).
 * @param {number} opacity - The new opacity level for the color, a number between 0 and 1.
 *   0 represents full transparency, and 1 represents full opacity.
 * 
 * @returns {string} - The color with adjusted opacity, in the same format as the input.
 * 
 * @throws {Error} - If the input color is in an unrecognized or invalid format, an error is thrown.
 * 
 * Example usage:
 * changeOpacity('#ff0000', 0.5); // Returns a half-transparent red color in HEX format.
 * changeOpacity('rgba(255, 0, 0, 0.8)', 0.3); // Adjusts an RGBA red color to 30% opacity.
 */
const changeOpacity = (color: string, opacity: number): string => {
  const colorFormat = getColorFormat(color);

  if (!colorFormat) {
    throw new Error('Invalid color format');
  }

  let [r, g, b, a] = convertColor(color, ColorFormat.RGBA).match(/\d+(\.\d+)?/g)!.map(Number);

  a = Math.max(0, Math.min(1, opacity));

  return convertColor(`rgba(${[r, g, b, a].join(', ')})`, colorFormat);
};

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
 * 
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
 * @returns {boolean} True if the color is dark, false otherwise.
 * 
 * Example usage:
 * isDark('#ff0000'); // Returns true as red is considered a dark color.
 */
const isDark = (color: string): boolean => {
  return getLuminance(color) <= 0.5;
};


export { 
  generateSteppedGradient,
  generateComplexGradient,
  blendColors,
  adjustBrightness,
  adjustSaturation,
  invertColor,
  applySepia,
  changeOpacity,
  extractOpacity,
  parseColorNumbers,
  getLuminance,
  isLight,
  isDark,
};
