import { ColorFormat } from '../types';
import { convertColor } from './convert';
import { getColorFormat } from './validate';

const generateIntermediateColors = (fromColor: string, toColor: string, count: number): string[] => {
  const fromColorFormat = getColorFormat(fromColor);
  const toColorFormat = getColorFormat(toColor);

  if (!fromColorFormat || !toColorFormat) {
    throw new Error('Invalid color format');
  }

  const fromRGB = convertColor(fromColor, ColorFormat.RGB).match(/\d+/g)!.map(Number);
  const toRGB = convertColor(fromColor, ColorFormat.RGB).match(/\d+/g)!.map(Number);
  const step = 1 / (count + 1);

  let intermediateColors = [];

  for (let i = 1; i <= count; i++) {
    const interpolatedColor = fromRGB.map((start, index) => {
      const end = toRGB[index];
      return Math.round(start + (end - start) * step * i);
    });

    intermediateColors.push(convertColor(`rgb(${interpolatedColor.join(', ')})`, fromColorFormat));
  }

  return intermediateColors;
};

export { generateIntermediateColors };
