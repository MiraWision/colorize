class ColorValidator {

  public static isHex(color: string): boolean {
    const regex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    return regex.test(color);
  }

  public static isHexa(color: string): boolean {
    const regex = /^#(?:[0-9a-fA-F]{4}){1,2}$/;
    return regex.test(color);
  }

  public static isRgb(color: string): boolean {
    const regex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
    if (!regex.test(color)) return false;

    // @ts-ignore
    const [, r, g, b] = color.match(regex).map(Number);
    return [r, g, b].every(val => val >= 0 && val <= 255);
  }

  public static isRgba(color: string): boolean {
    const regex = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0?\.\d+)\)$/;
    if (!regex.test(color)) return false;

    // @ts-ignore
    const [, r, g, b, a] = color.match(regex).map(Number);
    return [r, g, b].every(val => val >= 0 && val <= 255) && a >= 0 && a <= 1;
  }

  public static isHsl(color: string): boolean {
    const regex = /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/;
    if (!regex.test(color)) return false;

    // @ts-ignore
    const [, h, s, l] = color.match(regex).map(Number);
    return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100;
  }

  public static isHsla(color: string): boolean {
    const regex = /^hsla\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%,\s*(0|1|0?\.\d+)\)$/;
    if (!regex.test(color)) return false;

    // @ts-ignore
    const [, h, s, l, a] = color.match(regex).map(Number);
    return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100 && a >= 0 && a <= 1;
  }

  public static isCmyk(color: string): boolean {
    const regex = /^cmyk\((\d{1,3})%,\s*(\d{1,3})%,\s*(\d{1,3})%,\s*(\d{1,3})%\)$/;
    if (!regex.test(color)) return false;

    // @ts-ignore
    const [, c, m, y, k] = color.match(regex).map(Number);
    return [c, m, y, k].every(val => val >= 0 && val <= 100);
  }

  public static isHsv(color: string): boolean {
    const regex = /^hsv\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/i;
    if (!regex.test(color)) return false;

    // @ts-ignore
    const [, h, s, v] = color.match(regex).map(Number);
    return h >= 0 && h <= 360 && s >= 0 && s <= 100 && v >= 0 && v <= 100;
  }

  public static validate(color: string): boolean {
    return (
      this.isHex(color) ||
      this.isHexa(color) ||
      this.isRgb(color) ||
      this.isRgba(color) ||
      this.isHsl(color) ||
      this.isHsla(color) ||
      this.isCmyk(color) ||
      this.isHsv(color)
    );
  }
}

export default ColorValidator;