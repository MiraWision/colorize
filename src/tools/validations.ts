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

const isValidHEXAColor = (color: string): boolean => {
  const regex = /^#(?:[0-9a-fA-F]{4}){1,2}$/;
  
  return regex.test(color);
};

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
