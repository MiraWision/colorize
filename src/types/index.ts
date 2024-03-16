interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface HSV {
  h: number;
  s: number;
  v: number;
}

interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

interface RGBA extends RGB {
  a: number;
}

interface HSLA extends HSL {
  a: number;
}

enum HarmonyType {
  Complementary = 'complementary',
  Analogous = 'analogous',
  Triadic = 'triadic',
  Tetradic = 'tetradic',
  Monochromatic = 'monochromatic',
  SplitComplementary = 'splitComplementary',
  NeutralColors = 'neutralColors',
  Random = 'random',
}

interface ColorFormats {
  name: string;
  rgb: string;
  hex: string;
  hsl: string;
  cmyk: string;
}

interface ColorMap {
  [key: string]: string;
}

const ColorNamesMap: ColorMap = {
  '#000000': 'Black',
  '#FFFFFF': 'White',
  '#FF0000': 'Red',
  '#00FF00': 'Lime',
  '#0000FF': 'Blue',
  '#FFFF00': 'Yellow',
  '#00FFFF': 'Aqua',
  '#FF00FF': 'Fuchsia',
  '#C0C0C0': 'Silver',
  '#808080': 'Gray',
  '#800000': 'Maroon',
  '#808000': 'Olive',
  '#008000': 'Green',
  '#800080': 'Purple',
  '#008080': 'Teal',
  '#000080': 'Navy',
  '#FFA500': 'Orange',
  '#663399': 'RebeccaPurple', 
  '#32CD32': 'LimeGreen',        
  '#FFD700': 'Gold',         
  '#FF6347': 'Tomato',        
  '#48D1CC': 'MediumTurquoise',
  '#8A2BE2': 'BlueViolet',    
  '#FF8C00': 'DarkOrange',   
  '#ADFF2F': 'GreenYellow',   
  '#8B008B': 'DarkMagenta',
  '#F0E68C': 'Khaki',
  '#FF1493': 'DeepPink',
  '#87CEEB': 'SkyBlue',
  '#FF4500': 'OrangeRed',
  '#4B0082': 'Indigo',
  '#7CFC00': 'LawnGreen',
  '#00CED1': 'DarkTurquoise',
  '#B22222': 'FireBrick',
  '#B8860B': 'DarkGoldenRod',
  '#9932CC': 'DarkOrchid',
  '#8B0000': 'DarkRed',
  '#6B8E23': 'OliveDrab',
  '#A52A2A': 'Brown',
  '#DAA520': 'GoldenRod',
  '#D2691E': 'Chocolate',
  '#DC143C': 'Crimson',
  '#20B2AA': 'LightSeaGreen',
  '#191970': 'MidnightBlue',
  '#FF7F50': 'Coral',
  '#6A5ACD': 'SlateBlue',
  '#FFDEAD': 'NavajoWhite',
  '#2F4F4F': 'DarkSlateGray',
  '#8FBC8F': 'DarkSeaGreen',
  '#BDB76B': 'DarkKhaki',
  '#F5DEB3': 'Wheat',
  '#FF69B4': 'HotPink',
  '#7B68EE': 'MediumSlateBlue',
  '#9370DB': 'MediumPurple',
  '#3CB371': 'MediumSeaGreen',
  '#7FFFD4': 'Aquamarine',
  '#6495ED': 'CornflowerBlue',
  '#FA8072': 'Salmon',
  '#00FA9A': 'MediumSpringGreen',
  '#1E90FF': 'DodgerBlue',
  '#CD5C5C': 'IndianRed',
  '#00BFFF': 'DeepSkyBlue',
  '#DA70D6': 'Orchid',
  '#4682B4': 'SteelBlue',
  '#D2B48C': 'Tan',
  '#8B4513': 'SaddleBrown',
  '#483D8B': 'DarkSlateBlue',
  '#7FFF00': 'Chartreuse',
  '#00FF7F': 'Spring Green',
};


export { RGB, HSL, RGBA, HSLA, HSV, CMYK, ColorNamesMap as colorNameMap, ColorFormats, HarmonyType };