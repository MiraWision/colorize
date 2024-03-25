import { blendColors } from './blend-colors';

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

export { shade };
