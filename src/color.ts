import { adjustBrightness } from './adjust-brightness';
import { adjustSaturation } from './adjust-saturation';
import { applyGreyscale } from './apply-greyscale';
import { applySepia } from './apply-sepia';
import { changeOpacity } from './change-opacity';
import { convertColor } from './convert-color';
import { extractOpacity } from './extract-opacity';
import { getColorFormat } from './get-color-format';
import { getLuminance } from './get-luminance';
import { invertColor } from './invert-color';
import { isDark } from './is-dark';
import { isLight } from './is-light';
import { parseColorNumbers } from './parse-color-numbers';
import { shade } from './shade';
import { tint } from './tint';
import { ColorFormat, HSL, HSLA, RGB, RGBA } from './types';

/**
 * The Color class provides a robust set of methods for color manipulation and conversion.
 * It supports various color formats and offers functionalities to adjust color properties like
 * brightness, saturation, opacity, and to apply effects like sepia and grayscale.
 */
class Color {
  // Holds the current color value as a string
  private currentColor: string = '';

  // Holds the current color format as a string
  private currentFormat: string = '';

  /**
   * Creates an instance of the Color class.
   * @param {string} initialColor - The initial color value in any supported format.
   */
  constructor(initialColor: string) {
    this.set(initialColor);
  }

  /**
   * Sets the current color and format if the color is valid.
   * @param {string} color - The color value to be set.
   */
  set(color: string): void {
    const format = getColorFormat(color);

    if (format) {
      this.currentColor = color;
      this.currentFormat = format;
    } else {
      this.currentColor = '';
      this.currentFormat = '';
    }
  }

  /**
   * Returns the current color value.
   * @returns {string} The current color value.
   */
  get(): string {
    return this.currentColor;
  }

  /**
   * Returns the current color format.
   * @returns {string} The current color format.
   */
  format(): string {
    return this.currentFormat;
  }

  /**
   * Converts the current color to HEX format.
   * @param {ColorFormat} format - The format to convert.
   * @returns {string} The color in converted format.
   */
  convert(format: ColorFormat): string {
    return convertColor(this.currentColor, format);
  }

  /**
   * Converts the current color to HEX format.
   * @returns {string} The color in HEX format.
   */
  hex(): string {
    return convertColor(this.currentColor, ColorFormat.HEX);
  }

  /**
   * Converts the current color to HEXA format (HEX with alpha).
   * @returns {string} The color in HEXA format.
   */
  hexa(): string {
    return convertColor(this.currentColor, ColorFormat.HEXA);
  }

  /**
   * Converts the current color to RGB format.
   * @returns {string} The color in RGB format.
   */
  rgb(): string {
    return convertColor(this.currentColor, ColorFormat.RGB);
  }

  /**
   * Converts the current color to RGBA format (RGB with alpha).
   * @returns {string} The color in RGBA format.
   */
  rgba(): string {
    return convertColor(this.currentColor, ColorFormat.RGBA);
  }

  /**
   * Converts the current color to HSL format.
   * @returns {string} The color in HSL format.
   */
  hsl(): string {
    return convertColor(this.currentColor, ColorFormat.HSL);
  }

  /**
   * Converts the current color to HSLA format (HSL with alpha).
   * @returns {string} The color in HSLA format.
   */
  hsla(): string {
    return convertColor(this.currentColor, ColorFormat.HSLA);
  }

  /**
   * Converts the current color to HSV format.
   * @returns {string} The color in HSV format.
   */
  hsv(): string {
    return convertColor(this.currentColor, ColorFormat.HSV);
  }

  /**
   * Converts the current color to CMYK format.
   * @returns {string} The color in CMYK format.
   */
  cmyk(): string {
    return convertColor(this.currentColor, ColorFormat.CMYK);
  }

  /**
   * Extracts the opacity value from the current color.
   * @returns {{ opacity: number; color: string }} The opacity value and the base color.
   */
  extractOpacity(): { opacity: number; color: string } {
    return extractOpacity(this.currentColor);
  }

  /**
   * Parses the color components into numeric values.
   * @param {ColorFormat.RGB | ColorFormat.RGBA | ColorFormat.HSL | ColorFormat.HSLA} format - The format to parse.
   * @returns {RGB | RGBA | HSL | HSLA} The parsed numeric components of the color.
   */
  parseNumbers(format: ColorFormat.RGB | ColorFormat.RGBA | ColorFormat.HSL | ColorFormat.HSLA): RGB | RGBA | HSL | HSLA {
    return parseColorNumbers(this.currentColor, format);
  }

  /**
   * Calculates the luminance of the current color.
   * @returns {number} The luminance value.
   */
  luminance(): number {
    return getLuminance(this.currentColor);
  }

  /**
   * Determines if the current color is light.
   * @returns {boolean} True if the color is considered light, false otherwise.
   */
  isLight(): boolean {
    return isLight(this.currentColor);
  }

  /**
   * Determines if the current color is dark.
   * @returns {boolean} True if the color is considered dark, false otherwise.
   */
  isDark(): boolean {
    return isDark(this.currentColor);
  }

  /**
   * Adjusts the brightness of the current color by the specified amount.
   * @param {number} amount - The amount to adjust the brightness by.
   * @returns {string} The updated color.
   */
  applyBrightness(amount: number): string {
    this.currentColor = adjustBrightness(this.currentColor, amount);

    return this.currentColor;
  }

  /**
   * Returns a new color with the brightness adjusted by the specified amount without changing the current color.
   * @param {number} amount - The amount to adjust the brightness by.
   * @returns {string} The color with adjusted brightness.
   */
  withBrightness(amount: number): string {
    return adjustBrightness(this.currentColor, amount);
  }

  /**
   * Adjusts the saturation of the current color by the specified amount.
   * @param {number} amount - The amount to adjust the saturation by.
   * @returns {string} The updated color.
   */
  applySaturation(amount: number): string {
    this.currentColor = adjustSaturation(this.currentColor, amount);

    return this.currentColor;
  }

  /**
   * Returns a new color with the saturation adjusted by the specified amount without changing the current color.
   * @param {number} amount - The amount to adjust the saturation by.
   * @returns {string} The color with adjusted saturation.
   */
  withSaturation(amount: number): string {
    return adjustSaturation(this.currentColor, amount);
  }

  /**
   * Applies a grayscale effect to the current color and updates it.
   * @returns {string} The updated color.
   */
  applyGrayscale(): string {
    this.currentColor = applyGreyscale(this.currentColor);

    return this.currentColor;
  }

  /**
   * Returns a new color with a grayscale effect without changing the current color.
   * @returns {string} The color with a grayscale effect.
   */
  withGrayscale(): string {
    return applyGreyscale(this.currentColor);
  }

  /**
   * Applies a sepia effect to the current color and updates it.
   * @returns {string} The updated color.
   */
  applySepia(): string {
    this.currentColor = applySepia(this.currentColor);

    return this.currentColor;
  }

  /**
   * Returns a new color with a sepia effect without changing the current color.
   * @returns {string} The color with a sepia effect.
   */
  withSepia(): string {
    return applySepia(this.currentColor);
  }

  /**
   * Adjusts the opacity of the current color by the specified amount.
   * @param {number} opacity - The new opacity level.
   * @returns {string} The updated color.
   */
  applyOpacity(opacity: number): string {
    this.currentColor = changeOpacity(this.currentColor, opacity);

    return this.currentColor;
  }

  /**
   * Returns a new color with the specified opacity without changing the current color.
   * @param {number} opacity - The new opacity level.
   * @returns {string} The color with adjusted opacity.
   */
  withOpacity(opacity: number): string {
    return changeOpacity(this.currentColor, opacity);
  }

  /**
   * Inverts the current color and updates it.
   * @returns {string} The updated color.
   */
  applyInvert(): string {
    this.currentColor = invertColor(this.currentColor);

    return this.currentColor;
  }

  /**
   * Returns a new color that is the inverse of the current color without changing the current color.
   * @returns {string} The inverted color.
   */
  withInvert(): string {
    return invertColor(this.currentColor);
  }

  /**
   * Applies a shading effect to the current color by the specified percentage and updates it.
   * @param {number} percentage - The percentage to shade the color by.
   * @returns {string} The updated color.
   */
  applyShade(percentage: number): string {
    this.currentColor = shade(this.currentColor, percentage);

    return this.currentColor;
  }

  /**
   * Returns a new color that is shaded by the specified percentage without changing the current color.
   * @param {number} percentage - The percentage to shade the color by.
   * @returns {string} The shaded color.
   */
  withShade(percentage: number): string {
    return shade(this.currentColor, percentage);
  }

  /**
   * Applies a tinting effect to the current color by the specified percentage and updates it.
   * @param {number} percentage - The percentage to tint the color by.
   * @returns {string} The updated color.
   */
  applyTint(percentage: number): string {
    this.currentColor = tint(this.currentColor, percentage);

    return this.currentColor;
  }

  /**
   * Returns a new color that is tinted by the specified percentage without changing the current color.
   * @param {number} percentage - The percentage to tint the color by.
   * @returns {string} The tinted color.
   */
  withTint(percentage: number): string {
    return tint(this.currentColor, percentage);
  }
}

export { Color };
