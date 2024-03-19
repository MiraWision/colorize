import { convertColor } from './convertions';
import { getColorFormat } from './validations';

import { ColorFormat } from '../types';

const generateSteppedGradient = (fromColor: string, toColor: string, count: number): string[] => {
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

const blendColors = (fromColor: string, toColor: string, weight: number): string => {
  const fromColorFormat = getColorFormat(fromColor);
  const toColorFormat = getColorFormat(toColor);

  if (!fromColorFormat || !toColorFormat) {
    throw new Error('Invalid color format');
  }

  const fromRGB = convertColor(fromColor, ColorFormat.RGB).match(/\d+/g)!.map(Number);
  const toRGB = convertColor(fromColor, ColorFormat.RGB).match(/\d+/g)!.map(Number);

  const [r, g, b] = [0, 1, 2].map((i) => fromRGB[i] * (1 - weight) + toRGB[i] * weight);

  return convertColor(`rgb(${[r, g, b].join(', ')})`, fromColorFormat);
};

const adjustBrightness = (color: string, amount: number): string => {
  const colorFormat = getColorFormat(color);

  if (!colorFormat) {
    throw new Error('Invalid color format');
  }

  const hslColor = convertColor(color, ColorFormat.HSL);

  let [h, s, l] = hslColor.match(/\d+/g)!.map(Number);

  l = Math.max(0, Math.min(100, l + amount));

  return convertColor(`hsl(${h}, ${s}%, ${l}%)`, colorFormat);
};

const adjustSaturation = (color: string, amount: number): string => {
  const colorFormat = getColorFormat(color);

  if (!colorFormat) {
    throw new Error('Invalid color format');
  }

  const hslColor = convertColor(color, ColorFormat.HSL);

  let [h, s, l] = hslColor.match(/\d+/g)!.map(Number);

  s = Math.max(0, Math.min(100, s + amount));

  return convertColor(`hsl(${h}, ${s}%, ${l}%)`, colorFormat);
};

const invertColor = (color: string): string => {
  const colorFormat = getColorFormat(color);

  if (!colorFormat) {
    throw new Error('Invalid color format');
  }

  let [r, g, b] = convertColor(colorFormat, ColorFormat.RGB).match(/\d+/g)!.map(Number);

  r = 255 - r;
  g = 255 - g;
  b = 255 - b;

  return convertColor(`rgb(${[r, g, b].join(', ')})`, colorFormat);
};

const applySepia = (color: string): string => {
  const colorFormat = getColorFormat(color);

  if (!colorFormat) {
    throw new Error('Invalid color format');
  }

  let [r, g, b] = convertColor(colorFormat, ColorFormat.RGB).match(/\d+/g)!.map(Number);

  r = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
  g = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
  b = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));

  return convertColor(`rgb(${[r, g, b].join(', ')})`, colorFormat);
};

const changeOpacity = (color: string, opacity: number): string => {
  const colorFormat = getColorFormat(color);

  if (!colorFormat) {
    throw new Error('Invalid color format');
  }

  let [r, g, b, a] = convertColor(colorFormat, ColorFormat.RGBA).match(/\d+(\.\d+)?/g)!.map(Number);

  a = Math.max(0, Math.min(1, opacity));

  return convertColor(`rgba(${[r, g, b, a].join(', ')})`, colorFormat);
};

export { 
  generateSteppedGradient,
  blendColors,
  adjustBrightness,
  adjustSaturation,
  invertColor,
  applySepia,
  changeOpacity,
};
