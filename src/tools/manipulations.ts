import { convertColor } from './convertions';
import { getColorFormat } from './validations';

import { ColorFormat } from '../types';

/**
 * Generates a stepped color gradient between two colors.
 * This function creates a series of intermediate colors that form a gradient
 * from a starting color to an ending color, with the number of steps specified by the user.
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
 * generateSteppedGradient('#FF0000', '#00FF00', 5);
 *  //Might return an array of 5 intermediate colors in hexadecimal format between red and green.
 */
const generateSteppedGradient = (fromColor: string, toColor: string, count: number): string[] => {
  const fromColorFormat = getColorFormat(fromColor);
  const toColorFormat = getColorFormat(toColor);

  if (!fromColorFormat || !toColorFormat) {
    throw new Error('Invalid color format');
  }

  const fromRGB = convertColor(fromColor, ColorFormat.RGB).match(/\d+/g)!.map(Number);
  const toRGB = convertColor(fromColor, ColorFormat.RGB).match(/\d+/g)!.map(Number);
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
 * blendColors('#FF0000', '#0000FF', 0.5);
 * // Returns a color string representing the color halfway between red and blue.
 */
const blendColors = (fromColor: string, toColor: string, weight: number): string => {
  const fromColorFormat = getColorFormat(fromColor);
  const toColorFormat = getColorFormat(toColor);

  if (!fromColorFormat || !toColorFormat) {
    throw new Error('Invalid color format');
  }

  const fromRGB = convertColor(fromColor, ColorFormat.RGB).match(/\d+/g)!.map(Number);
  const toRGB = convertColor(fromColor, ColorFormat.RGB).match(/\d+/g)!.map(Number);

  const [r, g, b] = [0, 1, 2].map((i) => fromRGB[i] * (1 - weight) + toRGB[i] * weight);

  return convertColor(`rgb(${[r, g, b].join(', ')})`, fromColorFormat);
};

/**
 * Adjusts the brightness of a given color by a specified amount.
 * The function converts the color to its HSL (Hue, Saturation, Lightness) representation,
 * then adjusts the lightness component by the specified amount.
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
 * adjustBrightness('#00FF00', -20); // Makes a bright green color darker
 * adjustBrightness('rgb(255, 0, 0)', 10); // Makes a red color brighter
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
 * This function works by converting the input color to the HSL (Hue, Saturation, Lightness)
 * color space, adjusting the saturation component, and then converting it back to the original
 * color format. This allows for precise control over the color's visual intensity.
 * 
 * @param {string} color - The color to be adjusted, provided in a format recognized by `getColorFormat`.
 *   This could be in formats like HEX, RGB, or named colors, among others.
 * @param {number} amount - The amount to adjust the saturation by. This value can be positive (to increase saturation)
 *                          or negative (to decrease saturation). The final saturation value is constrained
 *                          between 0% (completely desaturated) and 100% (fully saturated).
 * 
 * @returns {string} - The color with adjusted saturation, in the same format as the input color.
 * 
 * @throws {Error} - If the input color's format is invalid or unrecognized, an error is thrown.
 * 
 * Example usage:
 * adjustSaturation('#00FF00', -20); // Decreases the saturation of a bright green color, making it more muted.
 * adjustSaturation('rgb(255, 0, 0)', 20); // Increases the saturation of a red color, making it more vivid.
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
 * The inversion is performed on the RGB representation of the color, where each
 * of the Red, Green, and Blue components is subtracted from 255 to find its inverse.
 * The resulting inverted color is then converted back to the original color's format.
 * 
 * @param {string} color - The color to be inverted, specified as a string in a recognized format.
 *   This could be a hexadecimal code, RGB(A) notation, or any other format supported by `getColorFormat`.
 * 
 * @returns {string} - The inverted color, represented in the same format as the input.
 * 
 * @throws {Error} - Throws an error if the input color is in an unrecognized or invalid format.
 * 
 * Example usage:
 * invertColor('#FFFFFF'); // Returns '#000000', inverting white to black.
 * invertColor('rgb(255, 0, 0)'); // Returns 'rgb(0, 255, 255)', inverting red to cyan.
 */
const invertColor = (color: string): string => {
  const colorFormat = getColorFormat(color);

  if (!colorFormat) {
    throw new Error('Invalid color format');
  }

  let [r, g, b] = convertColor(colorFormat, ColorFormat.RGB).match(/\d+/g)!.map(Number);

  r = 255 - r;
  g = 255 - g;
  b = 255 - b;

  return convertColor(`rgb(${[r, g, b].join(', ')})`, colorFormat);
};

/**
 * Applies a sepia tone effect to the specified color.
 * The sepia effect is achieved by adjusting the Red, Green, and Blue components
 * of the color according to a set formula that simulates the look of sepia-toned photographs.
 * The function first converts the input color to RGB format, applies the sepia transformation,
 * and then converts it back to the original color format.
 * 
 * @param {string} color - The color to which the sepia effect will be applied, specified as a string
 *   in a recognized format (e.g., HEX, RGB, named colors).
 * 
 * @returns {string} - The sepia-toned color, represented in the same format as the input.
 * 
 * @throws {Error} - Throws an error if the input color is in an unrecognized or invalid format.
 * 
 * Example usage:
 * applySepia('#826C34'); // Returns a sepia-toned version of the original color.
 * applySepia('rgb(130, 108, 52)'); // Applies sepia toning to the given RGB color.
 */
const applySepia = (color: string): string => {
  const colorFormat = getColorFormat(color);

  if (!colorFormat) {
    throw new Error('Invalid color format');
  }

  let [r, g, b] = convertColor(colorFormat, ColorFormat.RGB).match(/\d+/g)!.map(Number);

  r = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
  g = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
  b = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));

  return convertColor(`rgb(${[r, g, b].join(', ')})`, colorFormat);
};

/**
 * Changes the opacity of a specified color to a new value.
 * The function works by converting the input color to the RGBA color format,
 * which includes an alpha channel for opacity, and then adjusting this alpha channel
 * to the specified opacity value. The color is then converted back to its original format.
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

  let [r, g, b, a] = convertColor(colorFormat, ColorFormat.RGBA).match(/\d+(\.\d+)?/g)!.map(Number);

  a = Math.max(0, Math.min(1, opacity));

  return convertColor(`rgba(${[r, g, b, a].join(', ')})`, colorFormat);
};

export { 
  generateSteppedGradient,
  blendColors,
  adjustBrightness,
  adjustSaturation,
  invertColor,
  applySepia,
  changeOpacity,
};