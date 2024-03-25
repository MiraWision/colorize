import { convertColor } from './convertions';

import { ColorFormat } from '../types';
import { getColorFormat } from './format-detection';

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

  if (weight < 0 || weight > 1) {
    throw new Error('Invalid weight value');
  }

  if (!fromColorFormat || !toColorFormat) {
    throw new Error('Invalid color format');
  }

  const fromRGB = convertColor(fromColor, ColorFormat.RGB).match(/\d+/g)!.map(Number);
  const toRGB = convertColor(toColor, ColorFormat.RGB).match(/\d+/g)!.map(Number);

  const [r, g, b] = [0, 1, 2].map((i) => Math.round(fromRGB[i] * (1 - weight) + toRGB[i] * weight));

  return convertColor(`rgb(${[r, g, b].join(', ')})`, fromColorFormat);
};

/**
 * Creates a tint of the given color by mixing it with white.
 * 
 * @param {string} color - The color to be tinted, in hexadecimal format.
 * @param {number} weight - The percentage of white to mix into the color, between 0 and 1.
 * 
 * @returns {string} The tinted color in hexadecimal format.
 * 
 * Example usage:
 * const lightRed = tint("#ff0000", 0.5); // Mixes red with 50% white
 */
const tint = (color: string, weight: number): string => {
  return blendColors(color, '#FFFFFF', weight);
};

/**
 * Creates a shade of the given color by mixing it with black.
 * 
 * @param {string} color - The color to be shaded, in hexadecimal format.
 * @param {number} weight - The percentage of black to mix into the color, between 0 and 1.
 * @returns {string} The shaded color in hexadecimal format.
 * 
 * Example usage:
 * const darkRed = shade("#ff0000", 0.5); // Mixes red with 50% black
 */
const shade = (color: string, weight: number): string => {
  return blendColors(color, '#000000', weight);
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

export { 
  blendColors,
  tint,
  shade,
  adjustBrightness,
  adjustSaturation,
  invertColor,
  applySepia,
  applyGreyscale,
  changeOpacity,
};
