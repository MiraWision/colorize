import { RGB, HSL, RGBA, HSLA } from '../types';
import ColorConversion from './color-conversion';

class ColorManipulation {
  public static adjustBrightness(color: RGB | RGBA | HSL | HSLA, amount: number): RGB | RGBA | HSL | HSLA {
    if ('r' in color) {
      // RGB or RGBA
      return {
        ...color,
        r: Math.max(0, Math.min(255, color.r + amount)),
        g: Math.max(0, Math.min(255, color.g + amount)),
        b: Math.max(0, Math.min(255, color.b + amount)),
      };
    } else if ('h' in color) {
      // HSL or HSLA
      return {
        ...color,
        l: Math.max(0, Math.min(100, color.l + amount)),
      };
    } else {
      throw new Error('Unsupported color format');
    }
  }

  public static adjustSaturation(color: RGB | RGBA | HSL | HSLA, amount: number): RGB | RGBA | HSL | HSLA {

    if ('r' in color && 'g' in color && 'b' in color) {
      let hslColor = ColorConversion.rgbToHsl(color);
      hslColor.s = Math.max(0, Math.min(100, hslColor.s + amount));
      if ('a' in color) {
        return { ...ColorConversion.hslToRgb(hslColor), a: color.a };
      }
      return ColorConversion.hslToRgb(hslColor);
    } else if ('h' in color && 's' in color && 'l' in color) {
      return {
        ...color,
        s: Math.max(0, Math.min(100, color.s + amount)),
      };
    } else {
      throw new Error('Unsupported color format');
    }
  }

  public static blendColors(color1: RGB, color2: RGB, weight: number): RGB {
    return {
      r: Math.round(color1.r * (1 - weight) + color2.r * weight),
      g: Math.round(color1.g * (1 - weight) + color2.g * weight),
      b: Math.round(color1.b * (1 - weight) + color2.b * weight)
    };
  }

  public static createGradient(color1: RGB, color2: RGB, steps: number): RGB[] {
    let gradient = [];
    for (let i = 0; i < steps; i++) {
      const weight = i / (steps - 1);
      gradient.push(this.blendColors(color1, color2, weight));
    }
    return gradient;
  }

  public static invertColor(color: RGB): RGB {
    return {
      r: 255 - color.r,
      g: 255 - color.g,
      b: 255 - color.b
    };
  }

  public static applySepia(color: RGB): RGB {
    let { r, g, b } = color;
    r = (r * 0.393) + (g * 0.769) + (b * 0.189);
    g = (r * 0.349) + (g * 0.686) + (b * 0.168);
    b = (r * 0.272) + (g * 0.534) + (b * 0.131);
    return {
      r: Math.min(255, r),
      g: Math.min(255, g),
      b: Math.min(255, b)
    };
  }

  public static changeOpacity(color: RGB | RGBA, opacity: number): RGBA {
    const validOpacity = Math.max(0, Math.min(1, opacity));

    if ('a' in color) {
      return { ...color, a: validOpacity };
    } else {
      return { ...color, a: validOpacity } as RGBA;
    }
  }

  public static lighten(color: RGB, amount: number): RGB {
    return {
      ...color,
      r: Math.min(255, color.r + amount),
      g: Math.min(255, color.g + amount),
      b: Math.min(255, color.b + amount)
    };
  }

  public static darken(color: RGB, amount: number): RGB {
    return {
      ...color,
      r: Math.max(0, color.r - amount),
      g: Math.max(0, color.g - amount),
      b: Math.max(0, color.b - amount)
    };
  }

}

export default ColorManipulation;