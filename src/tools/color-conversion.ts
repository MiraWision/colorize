// @ts-nocheck
import { RGB, HSL, HSV, CMYK, colorNameMap } from '../types/internal';
import ColorValidator from './color-validation';

class ColorConversion {
  public static rgbToHex({ r, g, b }: RGB): string {
    const toHex = (c: number) => {
      const hex = c.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }

  public static hexToRgb(hex: string): RGB {
    let r = 0, g = 0, b = 0;
  
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    }
    return { r, g, b };
  }

  public static rgbToHsl({ r, g, b }: RGB): HSL {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  public static hslToRgb({ h, s, l }: HSL): RGB {
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      h /= 360;
      s /= 100;
      l /= 100;

      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }

  public static rgbToHsv({ r, g, b }: RGB): HSV {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0; 
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
  }

  public static hsvToRgb({ h, s, v }: HSV): RGB {
    let r = 0, g = 0, b = 0;
    const i = Math.floor(h / 60);
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }

  public static rgbToCmyk({ r, g, b }: RGB): CMYK {
    const rDecimal = r / 255;
    const gDecimal = g / 255;
    const bDecimal = b / 255;
    const k = 1 - Math.max(rDecimal, gDecimal, bDecimal);
    const c = (1 - rDecimal - k) / (1 - k) || 0;
    const m = (1 - gDecimal - k) / (1 - k) || 0;
    const y = (1 - bDecimal - k) / (1 - k) || 0;
    return { c: Math.round(c * 100), m: Math.round(m * 100), y: Math.round(y * 100), k: Math.round(k * 100) };
  }

  public static cmykToRgb({ c, m, y, k }: CMYK): RGB {
    const r = 255 * (1 - c / 100) * (1 - k / 100);
    const g = 255 * (1 - m / 100) * (1 - k / 100);
    const b = 255 * (1 - y / 100) * (1 - k / 100);
    return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
  }

  public static hexToHsl(hex: string): HSL {
    const { r, g, b } = this.hexToRgb(hex);
    return this.rgbToHsl({ r, g, b });
  }

  public static hslToHex({ h, s, l }: HSL): string {
    const { r, g, b } = this.hslToRgb({ h, s, l });
    return this.rgbToHex({ r, g, b });
  }

  public static cmykToHex({ c, m, y, k }: CMYK): string {
    const rgb = this.cmykToRgb({ c, m, y, k });
    return this.rgbToHex(rgb);
  }

  public static hslToHsla({ h, s, l }: HSL, a: number): string {
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
  }

  public static hslaToHsl(hsla: string): string {
    const [h, s, l] = hsla.match(/\d+/g).slice(0, 3);
    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  public static generateColorName(hex: string): string {
    const normalizedHex = hex.toUpperCase();
    return colorNameMap[normalizedHex] || "Unknown";
  }

  private static hslStringToObject(hslString: string): HSL {
    const [h, s, l] = hslString.match(/\d+/g).map(Number);
    return { h, s, l };
  }

  private static cmykStringToObject(cmykString: string): CMYK {
    const [c, m, y, k] = cmykString.match(/\d+/g).map(Number);
    return { c, m, y, k };
  }

  private static hsvStringToObject(hsvString: string): HSV {
    const [h, s, v] = hsvString.match(/\d+/g).map(Number);
    return { h, s, v };
  }

  public static parseInputColor(input: string): RGB | null {
    if (!ColorValidator.validate(input)) {
      return null;
    }

    if (ColorValidator.isHex(input)) {
      return this.hexToRgb(input);
    } else if (ColorValidator.isRgb(input)) {
      const [r, g, b] = input.match(/\d+/g).map(Number);
      return { r, g, b };
    } else if (ColorValidator.isHsl(input)) {
      const hslObject = this.hslStringToObject(input);
      return this.hslToRgb(hslObject);
    } else if (ColorValidator.isCmyk(input)) {
      const cmykObject = this.cmykStringToObject(input);
      return this.cmykToRgb(cmykObject);
    } else if (ColorValidator.isHsv(input)) {
      const hsvObject = this.hsvStringToObject(input);
      return this.hsvToRgb(hsvObject);
    }

    return null;
  }

  public static convertColor(input: string): { name: string, rgb: string, hex: string, hsl: string, cmyk: string } {
    const rgb = this.parseInputColor(input);
    if (!rgb) {
      return {
        name: 'Invalid Color',
        rgb: '',
        hex: '',
        hsl: '',
        cmyk: ''
      };
    }
    
    const hex = this.rgbToHex(rgb);
    const hsl = this.rgbToHsl(rgb);
    const cmyk = this.rgbToCmyk(rgb);
    const name = this.generateColorName(hex);

    return {
      name,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hex,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`
    };
  }

  public static parseColorCode(code: string): RGB | HSL | CMYK | null {
    if (code.startsWith('#')) {
      return this.hexToRgb(code);
    } else if (code.startsWith('rgb')) {
      const [r, g, b] = code.match(/\d+/g).map(Number);
      return { r, g, b };
    } else if (code.startsWith('hsl')) {
      const [h, s, l] = code.match(/\d+/g).map(Number);
      return { h, s, l };
    } else if (code.startsWith('cmyk')) {
      const [c, m, y, k] = code.match(/\d+/g).map(Number);
      return { c, m, y, k };
    }
    return null;
  }

  public static formatColorCode(color: RGB | HSL | CMYK, format: string): string {
    switch (format) {
      case 'hex':
        return this.rgbToHex(color as RGB);
      case 'rgb':
        const { r, g, b } = color as RGB;
        return `rgb(${r}, ${g}, ${b})`;
      case 'hsl':
        const { h, s, l } = color as HSL;
        return `hsl(${h}, ${s}%, ${l}%)`;
      case 'cmyk':
        const { c, m, y, k } = color as CMYK;
        return `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
      default:
        return '';
    }
  }

  public static rgbaToRgb(rgba: string): string {
    const [r, g, b] = rgba.match(/\d+/g).slice(0, 3);
    return `rgb(${r}, ${g}, ${b})`;
  }

  public static rgbToRgba({ r, g, b }: RGB, a: number): string {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  private static clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  public static temperatureToColor(temp: number): string {
    let r = 0, g = 0, b = 0;

    temp = temp / 100;

    if (temp <= 66) {
      r = 255;
      g = temp;
      g = 99.4708025861 * Math.log(g) - 161.1195681661;

      if (temp <= 19) {
        b = 0;
      } else {
        b = temp - 10;
        b = 138.5177312231 * Math.log(b) - 305.0447927307;
      }
    } else {
      r = temp - 60;
      r = 329.698727446 * Math.pow(r, -0.1332047592);
      g = temp - 60;
      g = 288.1221695283 * Math.pow(g, -0.0755148492);
      b = 255;
    }

    r = this.clamp(r, 0, 255);
    g = this.clamp(g, 0, 255);
    b = this.clamp(b, 0, 255);

    return this.rgbToHex({ r: Math.round(r), g: Math.round(g), b: Math.round(b) });
  }
}

export default ColorConversion;