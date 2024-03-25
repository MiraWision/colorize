
import { getColorFormat } from './get-color-format';
import { cmykToRGBA, hexToRGBA, hexaToRGBA, hslToRGBA, hslaToRGBA, hsvToRGBA, rgbToRGBA, rgbaToCMYK, rgbaToHSL, rgbaToHSLA, rgbaToHSV, rgbaToHex, rgbaToHexa, rgbaToRGB } from './utils/convert-utils';

import { BaseColorFormat, ColorFormat } from './types';

/**
 * Converts a color from its current format to a specified target format.
 * The conversion process involves determining the color's current format.
 *
 * @param {string} color - The color to be converted, represented as a string.
 *   This color should be in a recognized color format (HEX(A), RGB(A), HSL(A), HSV, CMYK).
 * @param {ColorFormat} toFormat - The target format to which the color should be converted.
 *   This should be one of the predefined formats in the ColorFormat enumeration.
 *
 * @returns {string} - The converted color in the target format.
 *
 * @throws {Error} - Throws an error if the input color is in an invalid or unrecognized format.
 *
 * Example usage:
 * convertColor("#FF5733", ColorFormat.RGB); // returns 'rgb(255, 87, 51)'
 */
const convertColor = (color: string, toFormat: ColorFormat): string => {
  const fromFormat = getColorFormat(color);

  if (!fromFormat) {
    throw new Error('Invalid color format');
  }

  if (fromFormat === toFormat) {
    return color;
  }

  const convertToBase: { [key: string]: (color: string) => string } = {
    [ColorFormat.HEX]: hexToRGBA,
    [ColorFormat.HEXA]: hexaToRGBA,
    [ColorFormat.RGB]: rgbToRGBA,
    [ColorFormat.HSL]: hslToRGBA,
    [ColorFormat.HSLA]: hslaToRGBA,
    [ColorFormat.CMYK]: cmykToRGBA,
    [ColorFormat.HSV]: hsvToRGBA,
  };

  const convertFromBase: { [key: string]: (color: string) => string } = {
    [ColorFormat.HEX]: rgbaToHex,
    [ColorFormat.HEXA]: rgbaToHexa,
    [ColorFormat.RGB]: rgbaToRGB,
    [ColorFormat.HSL]: rgbaToHSL,
    [ColorFormat.HSLA]: rgbaToHSLA,
    [ColorFormat.CMYK]: rgbaToCMYK,
    [ColorFormat.HSV]: rgbaToHSV,
  };

  const baseColor = fromFormat === BaseColorFormat ? color : convertToBase[fromFormat](color);

  const outputColor = toFormat === BaseColorFormat ? baseColor : convertFromBase[toFormat](baseColor);

  return outputColor;
};

export { convertColor };
