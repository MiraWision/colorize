import { getColorFormat } from './format-detection';

wimport { BaseColorFormat, ColorFormat } from '../types';

/**
 * Converts a color from its current format to a specified target format.
 * The conversion process involves determining the color's current format.
 * 
 * @param {string} color - The color to be converted, represented as a string.
 *   This color should be in a recognized color format (HEX(A), RGB(A), HSL(A), HSV, CMYK).
 * @param {ColorFormat} toFormat - The target format to which the color should be converted.
 *   This should be one of the predefined formats in the ColorFormat enumeration.
 * 
 * @returns {string} - The converted color in the target format.
 * 
 * @throws {Error} - Throws an error if the input color is in an invalid or unrecognized format.
 * 
 * Example usage:
 * convertColor("#FF5733", ColorFormat.RGB); // returns 'rgb(255, 87, 51)'
 */
const convertColor = (color: string, toFormat: ColorFormat): string => {
  const fromFormat = getColorFormat(color);

  if (!fromFormat) {
    throw new Error('Invalid color format');
  }

  if (fromFormat === toFormat) {
    return color;
  }

  const convertToBase = {
    [ColorFormat.HEX]: hexToRGBA,
    [ColorFormat.HEXA]: hexaToRGBA,
    [ColorFormat.RGB]: rgbToRGBA,
    [ColorFormat.HSL]: hslToRGBA,
    [ColorFormat.HSLA]: hslaToRGBA,
    [ColorFormat.CMYK]: cmykToRGBA,
    [ColorFormat.HSV]: hsvToRGBA,
  };

  const convertFromBase = {
    [ColorFormat.HEX]: rgbaToHex,
    [ColorFormat.HEXA]: rgbaToHexa,
    [ColorFormat.RGB]: rgbaToRGB,
    [ColorFormat.HSL]: rgbaToHSL,
    [ColorFormat.HSLA]: rgbaToHSLA,
    [ColorFormat.CMYK]: rgbaToCMYK,
    [ColorFormat.HSV]: rgbaToHSV,
  };

  const baseColor = fromFormat === BaseColorFormat ? color : convertToBase[fromFormat](color);

  const outputColor = toFormat === BaseColorFormat ? baseColor : convertFromBase[toFormat](baseColor);

  return outputColor;
};

const hexToRGBA = (color: string): string => {
  let r = 0, g = 0, b = 0, a = 1;

  if (color.length === 4) {
    r = parseInt(color[1] + color[1], 16);
    g = parseInt(color[2] + color[2], 16);
    b = parseInt(color[3] + color[3], 16);
  } else if (color.length === 7) {
    r = parseInt(color[1] + color[2], 16);
    g = parseInt(color[3] + color[4], 16);
    b = parseInt(color[5] + color[6], 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const hexaToRGBA = (color: string): string => {
  let r = 0, g = 0, b = 0, a = 1;

  if (color.length === 9) {
    r = parseInt(color[1] + color[2], 16);
    g = parseInt(color[3] + color[4], 16);
    b = parseInt(color[5] + color[6], 16);
    a = Math.round(parseInt(color[7] + color[8], 16) / 255 * 100) / 100;
  }

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const rgbToRGBA = (color: string): string => {
  return color.replace(')', ', 1)').replace('rgb', 'rgba');
};

const hslToRGBA = (color: string): string => {
  const [h, s, l] = color.match(/\d+/g)!.map(Number);

  const saturation = s / 100;
  const lightness = l / 100;

  let c = (1 - Math.abs(2 * lightness - 1)) * saturation;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = lightness - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;  
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  const a = 1;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const hslaToRGBA = (color: string): string => {
  const [h, s, l, a] = color.match(/\d+(\.\d+)?/g)!.map(Number);

  const saturation = s / 100;
  const lightness = l / 100;

  let c = (1 - Math.abs(2 * lightness - 1)) * saturation;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = lightness - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;  
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const cmykToRGBA = (color: string): string => {
  let [c, m, y, k] = color.match(/(\d+(\.\d+)?%)/g)!.map((value) => parseFloat(value) / 100);

  let r = 255 * (1 - c) * (1 - k);
  let g = 255 * (1 - m) * (1 - k);
  let b = 255 * (1 - y) * (1 - k);

  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);

  const a = 1;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const hsvToRGBA = (color: string): string => {
  let [h, s, v] = color.match(/\d+(\.\d+)?/g)!.map(Number);
    
  let r, g, b, i, f, p, q, t;
  const saturation = s / 100;
  const value = v / 100;

  if (saturation === 0) {
    r = g = b = value;
    return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, 1)`;
  }

  h /= 60;
  i = Math.floor(h);
  f = h - i;
  p = value * (1 - saturation);
  q = value * (1 - saturation * f);
  t = value * (1 - saturation * (1 - f));

  switch (i) {
    case 0:
      r = value;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = value;
      b = p;
      break;
    case 2:
      r = p;
      g = value;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = value;
      break;
    case 4:
      r = t;
      g = p;
      b = value;
      break;
    default: // case 5:
      r = value;
      g = p;
      b = q;
  }

  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, 1)`;
};

const rgbaToHex = (rgba: string): string => {
  const [r, g, b] = rgba.match(/\d+/g)!.map(Number);
  
  const rHex = r.toString(16).padStart(2, '0');
  const gHex = g.toString(16).padStart(2, '0');
  const bHex = b.toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`.toUpperCase();
};

const rgbaToHexa = (rgba: string): string => {
  const [r, g, b, a] = rgba.match(/\d+(\.\d+)?/g)!.map(Number);

  const alphaHex = Math.round(a * 255).toString(16).padStart(2, '0');
  const rHex = r.toString(16).padStart(2, '0');
  const gHex = g.toString(16).padStart(2, '0');
  const bHex = b.toString(16).padStart(2, '0');
  
  return `#${rHex}${gHex}${bHex}${alphaHex}`.toUpperCase();
};

const rgbaToRGB = (rgba: string): string => {
  const [r, g, b] = rgba.match(/\d+/g)!.map(Number).slice(0, 3);

  return `rgb(${r}, ${g}, ${b})`;
};

const rgbaToHSL = (rgba: string): string => {
  let [r, g, b] = rgba.match(/\d+/g)!.map(Number).map((value) => value / 255);

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  
  let h, s, l = (max + min) / 2;

  if(max === min) {
    h = s = 0;
  } else {
    const d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch(max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
        break;
    }
    
    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
};

const rgbaToHSLA = (rgba: string): string => {
  let [r, g, b, a] = rgba.match(/\d+(\.\d+)?/g)!.map(Number);

  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  
  let h, s, l = (max + min) / 2;

  if(max === min) {
    h = s = 0;
  } else {
    const d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch(max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
        break;
    }

    h /= 6;
  }

  return `hsla(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${a})`;
};

const rgbaToCMYK = (rgba: string): string => {
  let [r, g, b] = rgba.match(/\d+/g)!.map(Number).map((value) => value / 255);

  const k = 1 - Math.max(r, g, b);
  const c = (1 - r - k) / (1 - k) || 0;
  const m = (1 - g - k) / (1 - k) || 0;
  const y = (1 - b - k) / (1 - k) || 0;
  
  return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`;
}

const rgbaToHSV = (rgba: string): string => {
  let [r, g, b] = rgba.match(/\d+/g)!.map(Number).map((value) => value / 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h, s, v = max;

  if (delta === 0) {
    h = 0;
  } else if (max === r) {
    h = 60 * (((g - b) / delta) % 6);
  } else if (max === g) {
    h = 60 * (((b - r) / delta) + 2);
  } else {
    h = 60 * (((r - g) / delta) + 4);
  }

  h = h < 0 ? h + 360 : h;

  s = max === 0 ? 0 : (delta / max);

  return `hsv(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%)`;
};

export { 
  convertColor,
  rgbToRGBA,
  hexToRGBA,
  hexaToRGBA,
  hslToRGBA,
  hslaToRGBA,
  cmykToRGBA,
  hsvToRGBA,
  rgbaToRGB,
  rgbaToHex,
  rgbaToHexa,
  rgbaToHSL,
  rgbaToHSLA,
  rgbaToCMYK,
  rgbaToHSV,
};
