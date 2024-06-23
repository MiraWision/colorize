import { adjustHue } from './adjust-hue';

/**
 * Computes the opposite color (complementary color) by adjusting the hue by 180 degrees.
 * 
 * @param {string} color - The color to find the opposite for, provided in a format recognized by `getColorFormat`.
 *                          This could be in formats like HEX, RGB, or named colors, among others.
 * 
 * @returns {string} - The opposite color, in the same format as the input color.
 * 
 * @throws {Error} - If the input color's format is invalid or unrecognized, an error is thrown.
 * 
 * Example usage:
 * oppositeColor('#00FF00'); // returns the opposite color of a bright green.
 * oppositeColor('rgb(255, 0, 0)'); // returns the opposite color of red.
 */
const oppositeColor = (color: string): string => {
  return adjustHue(color, 180);
};

export { oppositeColor };
