import { generateSteppedGradient } from './generate-stepped-gradient';

/**
 * Generates a complex stepped color gradient between multiple colors.
 * This function creates a series of intermediate colors forming a gradient
 * between each pair of colors in the argument list, with specified steps between each pair.
 * 
 * @param args - A list of colors and steps where each color (except the last one) is followed by a number 
 *   indicating the steps to the next color. For example, the call might look like:
 *   generateMultiSteppedGradient("#ff0000", 3, "#ffff00", 4, "#0000ff").
 * 
 * @returns An array of color strings representing the complex gradient including all intermediate colors.
 *   The format of each color in the array is the same as the format of the first color in the input list.
 * 
 * @throws Will throw an error if the arguments don't follow the pattern [color, steps, color, ..., color].
 * 
 * Example usage:
 * generateMultiSteppedGradient("#ff0000", 3, "#ffff00", 4, "#0000ff");
 * // Returns an array including "#ff0000", three intermediate colors to "#ffff00",
 * // "#ffff00" itself, four intermediate colors to "#0000ff", and "#0000ff".
 */
const generateMultiSteppedGradient = (...args: (string | number)[]): string[] => {
  if (args.length < 3 || args.length % 2 === 0) {
    throw new Error('Function must be called with at least one color and one step count, in an interleaved manner.');
  }

  let gradientColors: string[] = [];

  for (let i = 0; i < args.length - 2; i += 2) {
    const fromColor = args[i];
    const steps = args[i + 1];
    const toColor = args[i + 2];

    if (typeof fromColor !== 'string' || typeof steps !== 'number' || typeof toColor !== 'string') {
      throw new Error('Arguments must follow the pattern [color, steps, color, ..., color].');
    }

    const gradientSegment = generateSteppedGradient(fromColor, toColor, steps as number);
    if (i === 0) {
      gradientColors.push(fromColor);
    }
    gradientColors.push(...gradientSegment);
    gradientColors.push(toColor);
  }

  return gradientColors;
};

export { generateMultiSteppedGradient };
