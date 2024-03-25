import { blendColors } from './blend-colors';

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

export { tint };
