import { convertColor } from './convert-color';
import { getColorFormat } from './get-color-format';
import { ColorFormat } from './types';

/**
 * Converts a color string into an estimated correlated color temperature (CCT) value expressed in Kelvin.
 * The result is clamped to the range 1000K–10000K, which covers most practical lighting conditions from candlelight to blue daylight.
 * 
 * @param {string} color - The color in any supported format (HEX, RGB, RGBA, HSL, HSLA, HSV, CMYK).
 *   Examples: "#FF4500", "rgb(255, 69, 0)", "hsl(16, 100%, 50%)"
 * 
 * @returns {number} Estimated color temperature in Kelvin (integer or float).
 *   Always in the range 1000 ≤ CCT ≤ 10000.
 * 
 * @example
 * getTemperature("#FF4500"); // ~2000 (warm orange, firelight)
 * getTemperature("rgb(255, 215, 0)"); // ~3000 (warm white, incandescent)
 * getTemperature("hsl(0, 0%, 100%)"); // ~5500 (neutral daylight)
 * getTemperature("#ADD8E6"); // ~9000 (blue sky light)
 */
export const getTemperature = (color: string): number => {
  const colorFormat = getColorFormat(color);

  // Use white as fallback if color format is invalid
  const validColor = colorFormat ? color : '#FFFFFF';

  // Convert to RGB format to extract RGB values
  const rgbColor = convertColor(validColor, ColorFormat.RGB);

  // Parse RGB values and normalize to 0–1 range
  const [r, g, b] = rgbColor.match(/\d+/g)!.map(Number).map(v => v / 255);

  // Apply gamma correction to convert sRGB → linear RGB
  const linearR = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const linearG = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const linearB = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  // Convert linear RGB to XYZ color space using sRGB D65 white point
  // sRGB to XYZ transformation matrix (D65 white point)
  const x = linearR * 0.4124 + linearG * 0.3576 + linearB * 0.1805;
  const y = linearR * 0.2126 + linearG * 0.7152 + linearB * 0.0722;
  const z = linearR * 0.0193 + linearG * 0.1192 + linearB * 0.9505;

  // Compute chromaticity coordinates (x, y)
  const sum = x + y + z;
  if (sum === 0) {
    // Handle pure black or very dark colors
    return 6500; // Default to neutral daylight
  }

  const chromaticityX = x / sum;
  const chromaticityY = y / sum;

  // Apply McCamy's formula to approximate CCT
  // McCamy's formula: CCT = 449 * n^3 + 3525 * n^2 + 6823.3 * n + 5520.33
  // where n = (x - 0.3320) / (0.1858 - y)
  const n = (chromaticityX - 0.3320) / (0.1858 - chromaticityY);
  
  if (isNaN(n) || !isFinite(n)) {
    // Handle edge cases where the formula breaks down
    return 6500; // Default to neutral daylight
  }

  const cct = 449 * Math.pow(n, 3) + 3525 * Math.pow(n, 2) + 6823.3 * n + 5520.33;

  // Clamp the result to the valid range: 1000K–10000K
  return Math.max(1000, Math.min(10000, cct));
};
