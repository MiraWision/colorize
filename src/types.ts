enum ColorFormat {
  HEX = 'hex',
  HEXA = 'hexa',
  RGB = 'rgb',
  RGBA = 'rgba',
  HSL = 'hsl',
  HSLA = 'hsla',
  CMYK = 'cmyk',
  HSV = 'hsv',
}

const BaseColorFormat = ColorFormat.RGBA;

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface RGBA extends RGB {
  a: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface HSLA extends HSL {
  a: number;
}

export {
  ColorFormat,
  BaseColorFormat,
  RGB,
  RGBA,
  HSL,
  HSLA,
};
