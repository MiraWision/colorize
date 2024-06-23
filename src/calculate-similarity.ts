import { Color } from './color';
import { ColorFormat, RGB } from './types';

/**
 * Calculates the similarity between two colors using the Euclidean distance in RGB color space.
 * 
 * @param {Color | string} color1 - The first color for comparison. Can be a color string or a Color instance.
 * @param {Color | string} color2 - The second color for comparison. Can be a color string or a Color instance.
 * 
 * @returns {number} - A similarity percentage where 100% means identical colors and 0% means completely different colors.
 * 
 * Example usage:
 * calculateSimilarity('#ff0000', '#00ff00'); // Returns similarity between red and green
 * calculateSimilarity(new Color('#ff0000'), new Color('#00ff00')); // Same as above using Color instances
 */
const calculateSimilarity = (color1: string | Color, color2: string | Color): number => {
  color1 = typeof color1 === 'string' ? new Color(color1) : color1;

  color2 = typeof color2 === 'string' ? new Color(color2) : color2;

  const { r: r1, g: g1, b: b1 } = color1.parseNumbers(ColorFormat.RGB) as RGB;

  const { r: r2, g: g2, b: b2 } = color2.parseNumbers(ColorFormat.RGB) as RGB;

  const difference = Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);

  const maxDifference = Math.sqrt(3 * 255 ** 2);

  return 100 - (difference / maxDifference) * 100;
};

export { calculateSimilarity };
