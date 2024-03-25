import { 
  isValidCMYKColor, 
  isValidHEXAColor, 
  isValidHEXColor, 
  isValidHSLAColor, 
  isValidHSLColor, 
  isValidHSVColor, 
  isValidRGBAColor, 
  isValidRGBColor,
} from './validations';

import { ColorFormat } from '../types';

/**
 * Identifies the format of a given color string from among several supported color models.
 * Utilizes a series of specific validators for different color formats, including HEX, HEXA,
 * RGB, RGBA, HSL, HSLA, HSV, and CMYK. This approach allows for accurately determining the
 * color model of the input string, facilitating format-specific processing or conversions.
 * 
 * @param {string} color - The color string to be identified.
 * 
 * @returns {ColorFormat | null} - The identified color format as a `ColorFormat` enum value,
 *                                 or `null` if the format does not match any of the supported types.
 * 
 * Example usage:
 * getColorFormat('#FF5733'); // returns 'HEX'
 * getColorFormat('rgb(255, 99, 71)'); // returns 'RGB'
 * getColorFormat('invalidColor'); // returns null, as the format is not recognized
 */
const getColorFormat = (color: string): ColorFormat | null => {
  const validators: { [key: string]: (color: string) => boolean } = {
    [ColorFormat.HEX]: isValidHEXColor,
    [ColorFormat.HEXA]: isValidHEXAColor,
    [ColorFormat.RGB]: isValidRGBColor,
    [ColorFormat.RGBA]: isValidRGBAColor,
    [ColorFormat.HSL]: isValidHSLColor,
    [ColorFormat.HSLA]: isValidHSLAColor,
    [ColorFormat.HSV]: isValidHSVColor,
    [ColorFormat.CMYK]: isValidCMYKColor,
  };

  for (const [type, validator] of Object.entries(validators)) {
    if (validator(color)) {
      return type as ColorFormat;
    }
  }

  return null;
}

export { getColorFormat };
