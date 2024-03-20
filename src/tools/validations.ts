import { ColorFormat } from '../types';

/**
 * Determines whether a given string is a valid HEX color.
 * 
 * A valid HEX color must start with a '#' followed by exactly
 * three or six hexadecimal characters (0-9, a-f, or A-F). This function
 * uses a regular expression to check the format of the input string.
 * 
 * Examples of valid HEX colors:
 * - "#fff"
 * - "#ffffff"
 * - "#123abc"
 * 
 * Examples of invalid HEX colors:
 * - "#ggg"
 * - "123456"
 * - "#12345" (invalid length)
 * 
 * @param {string} color The color string to validate.
 * @returns {boolean} True if the input is a valid HEX color, false otherwise.
 */
const isValidHEXColor = (color: string): boolean => {
  const regex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
  
  return regex.test(color);
};

/**
 * Determines whether a given string is a valid HEXA color code.
 * HEXA color codes are similar to HEX codes but include an additional alpha
 * value to specify transparency. They consist of a pound symbol (#) followed
 * by either 4 or 8 hexadecimal characters (0-9, a-f, A-F). The first three
 * (or six) characters represent the RGB color, and the last character (or two)
 * represents the alpha (transparency) value.
 * 
 * @param {string} color - The string to be tested for validity as a HEXA color code.
 * 
 * @returns {boolean} - True if the string is a valid HEXA color code, false otherwise.
 * 
 * Example usage:
 * isValidHEXAColor('#FA3E'); // Returns true
 * isValidHEXAColor('#FA3EF8'); // Returns true
 * isValidHEXAColor('#FA3EF812'); // Returns true
 * isValidHEXAColor('#FA3E12'); // Returns false, as it lacks the alpha value for a 6-character code
 * isValidHEXAColor('FA3EF8'); // Returns false, missing starting #
 */
const isValidHEXAColor = (color: string): boolean => {
  const regex = /^#(?:[0-9a-fA-F]{4}){1,2}$/;
  
  return regex.test(color);
};

/**
 * Checks if a given string is a valid representation of an RGB color.
 * An RGB color is specified as 'rgb(x, y, z)' where x, y, and z are integers
 * representing the red, green, and blue color components, respectively.
 * Each component must be within the range of 0 to 255.
 * 
 * @param {string} color - The color string to be validated.
 * 
 * @returns {boolean} - True if the string is a valid RGB color format and all color components
 *                      are within the specified range; otherwise, false.
 * 
 * Example usage:
 * isValidRGBColor('rgb(255, 99, 71)'); // Returns true
 * isValidRGBColor('rgb(256, -1, 300)'); // Returns false, components are out of bounds
 * isValidRGBColor('rgb(25, 99, 71)'); // Returns true
 * isValidRGBColor('rgb(255,255,255)'); // Returns true
 */
const isValidRGBColor = (color: string): boolean => {
  const regex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
  if (!regex.test(color)) return false;

  const match = color.match(regex)?.map(Number);

  if (!match) {
    return false;
  }

  const [, r, g, b] = match;

  return [r, g, b].every((value) => value >= 0 && value <= 255);
};

/**
 * Validates if a given string is a correct representation of an RGBA color.
 * An RGBA color is specified as 'rgba(x, y, z, a)' where x, y, and z are integers
 * representing the red, green, and blue components of the color, respectively,
 * each ranging from 0 to 255. The 'a' component is a floating-point number
 * representing the opacity, ranging from 0.0 (completely transparent) to 1.0 (fully opaque),
 * inclusive. The function uses a regular expression to validate the format and the numerical
 * range of the color components.
 * 
 * @param {string} color - The RGBA color string to be validated.
 * 
 * @returns {boolean} - True if the color string is a valid RGBA format and all components
 *                      (red, green, blue, alpha) are within their respective ranges; false otherwise.
 * 
 * Example usage:
 * isValidRGBAColor('rgba(255, 99, 71, 0.5)'); // Returns true
 * isValidRGBAColor('rgba(255, 99, 71, 1.1)'); // Returns false, alpha value is out of bounds
 * isValidRGBAColor('rgba(255, 99, 71, -0.1)'); // Returns false, negative alpha value
 */
const isValidRGBAColor = (color: string): boolean => {
  const regex = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0?\.\d+)\)$/;
  
  if (!regex.test(color)) {
    return false;
  }

  const match = color.match(regex)?.map(Number);

  if (!match) {
    return false;
  }

  const [, r, g, b, a] = match;

  return [r, g, b].every((value) => value >= 0 && value <= 255) && a >= 0 && a <= 1;
};

/**
 * Validates if a given string accurately represents a color in the HSL format.
 * HSL stands for Hue, Saturation, and Lightness, and colors in this format are
 * specified as 'hsl(h, s%, l%)', where h is the hue (0 to 360 degrees), s is the saturation
 * (0% to 100%), and l is the lightness (0% to 100%). This function uses a regular expression
 * to check the string format and then validates that the numerical values are within
 * their appropriate ranges.
 * 
 * @param {string} color - The HSL color string to be validated.
 * 
 * @returns {boolean} - True if the color string is a valid HSL format and all components
 *                      (hue, saturation, lightness) are within their respective ranges; false otherwise.
 * 
 * Example usage:
 * isValidHSLColor('hsl(120, 50%, 50%)'); // Returns true
 * isValidHSLColor('hsl(370, 50%, 50%)'); // Returns false, hue is out of bounds
 * isValidHSLColor('hsl(120, 101%, 50%)'); // Returns false, saturation is out of bounds
 */
const isValidHSLColor = (color: string): boolean => {
  const regex = /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/;

  if (!regex.test(color)) {
    return false;
  }

  const match = color.match(regex)?.map(Number);

  if (!match) {
    return false;
  }

  const [, h, s, l] = match;

  return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100;
};

/**
 * Validates if a given string is a correct representation of an HSLA color.
 * HSLA color notation includes hue (0 to 360 degrees), saturation (0% to 100%),
 * lightness (0% to 100%), and alpha (0.0 to 1.0 for transparency level).
 * This function utilizes a regular expression to validate the string's format
 * and then checks to ensure each numerical component is within its valid range.
 * 
 * @param {string} color - The HSLA color string to be validated.
 * 
 * @returns {boolean} - True if the color string matches the HSLA format and all
 *                      components (hue, saturation, lightness, alpha) fall within
 *                      their respective allowable ranges; false otherwise.
 * 
 * Example usage:
 * isValidHSLAColor('hsla(210, 100%, 50%, 0.5)'); // Returns true
 * isValidHSLAColor('hsla(210, 100%, 50%, 1.1)'); // Returns false, alpha value out of bounds
 * isValidHSLAColor('hsla(360, 50%, 50%, 0)'); // Returns true
 */
const isValidHSLAColor = (color: string): boolean => {
  const regex = /^hsla\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%,\s*(0|1|0?\.\d+)\)$/;

  if (!regex.test(color)) {
    return false;
  }

  const match = color.match(regex)?.map(Number);

  if (!match) {
    return false;
  }

  const [, h, s, l, a] = match;

  return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100 && a >= 0 && a <= 1;
};

/**
 * Validates if a given string is a correct representation of a CMYK color.
 * CMYK colors are defined with four components: Cyan, Magenta, Yellow, and Key (Black),
 * each represented as a percentage from 0% to 100%. This function uses a regular expression
 * to validate the string's format and then checks to ensure each component's value is within
 * the allowable range.
 * 
 * @param {string} color - The CMYK color string to be validated.
 * 
 * @returns {boolean} - True if the color string matches the CMYK format and all components
 *                      (Cyan, Magenta, Yellow, Key) are within the 0% to 100% range; false otherwise.
 * 
 * Example usage:
 * isValidCMYKColor('cmyk(0%, 100%, 0%, 0%)'); // Returns true for pure magenta
 * isValidCMYKColor('cmyk(101%, 0%, 0%, 0%)'); // Returns false, cyan value out of bounds
 * isValidCMYKColor('cmyk(50%, 50%, 50%, 50%)'); // Returns true for a mid-tone color
 */
const isValidCMYKColor = (color: string): boolean => {
  const regex = /^cmyk\((\d{1,3})%,\s*(\d{1,3})%,\s*(\d{1,3})%,\s*(\d{1,3})%\)$/;
 
  if (!regex.test(color)) {
    return false;
  }

  const match = color.match(regex)?.map(Number);

  if (!match) {
    return false;
  }

  const [, c, m, y, k] = match;

  return [c, m, y, k].every(val => val >= 0 && val <= 100);
};

/**
 * Validates whether a given string is a correct representation of an HSV color.
 * HSV stands for Hue, Saturation, and Value, where Hue is measured in degrees (0 to 360),
 * and both Saturation and Value are presented as percentages (0% to 100%).
 * This function employs a regular expression to check the string's format against
 * the expected HSV notation and then validates that the numerical components fall
 * within their correct ranges.
 * 
 * @param {string} color - The HSV color string to be validated.
 * 
 * @returns {boolean} - True if the color string adheres to the HSV format and all components
 *                      (hue, saturation, value) are within their designated ranges; otherwise, false.
 * 
 * Example usage:
 * isValidHSVColor('hsv(120, 100%, 100%)'); // Returns true for pure green
 * isValidHSVColor('hsv(361, 50%, 50%)'); // Returns false, hue is out of bounds
 * isValidHSVColor('hsv(240, 100%, 50%)'); // Returns true for a medium blue
 */
const isValidHSVColor = (color: string): boolean => {
  const regex = /^hsv\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/i;
  
  if (!regex.test(color)) {
    return false;
  }

  const match = color.match(regex)?.map(Number);

  if (!match) {
    return false;
  }

  const [, h, s, v] = match;

  return h >= 0 && h <= 360 && s >= 0 && s <= 100 && v >= 0 && v <= 100;
};

/**
 * Validates a given color string against multiple color formats.
 * This function consolidates various specific color format validators,
 * including HEX, HEXA, RGB, RGBA, HSL, HSLA, HSV, and CMYK, to determine
 * if the color string conforms to any of these recognized formats.
 * 
 * @param {string} color - The color string to be validated.
 * 
 * @returns {boolean} - True if the color string is valid in at least one of the supported
 *                      color formats; false otherwise.
 * 
 * Example usage:
 * isValidColor('#FF5733'); // Returns true for a valid HEX color.
 * isValidColor('rgb(255, 99, 71)'); // Returns true for a valid RGB color.
 * isValidColor('cmyk(0%, 100%, 100%, 0%)'); // Returns true for a valid CMYK color.
 * isValidColor('invalidColor'); // Returns false, does not match any supported format.
 */
const isValidColor = (color: string): boolean => {
  const validators = [
    isValidHEXColor, 
    isValidHEXAColor,
    isValidRGBColor,
    isValidRGBAColor,
    isValidHSLColor,
    isValidHSLAColor,
    isValidHSVColor,
    isValidCMYKColor,
  ];
  
  return validators.some((validator) => validator(color));
};

/**
 * Identifies the format of a given color string from among several supported color models.
 * Utilizes a series of specific validators for different color formats, including HEX, HEXA,
 * RGB, RGBA, HSL, HSLA, HSV, and CMYK. This approach allows for accurately determining the
 * color model of the input string, facilitating format-specific processing or conversions.
 * 
 * @param {string} color - The color string whose format is to be identified.
 * 
 * @returns {ColorFormat | null} - The identified color format as a `ColorFormat` enum value,
 *                                 or `null` if the format does not match any of the supported types.
 * 
 * Example usage:
 * getColorFormat('#FF5733'); // Returns 'HEX'
 * getColorFormat('rgb(255, 99, 71)'); // Returns 'RGB'
 * getColorFormat('invalidColor'); // Returns null, as the format is not recognized
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

export {
  getColorFormat,
  isValidColor,
  isValidHEXColor,
  isValidHEXAColor,
  isValidRGBColor,
  isValidRGBAColor,
  isValidHSLColor,
  isValidHSLAColor,
  isValidCMYKColor,
  isValidHSVColor,
};
