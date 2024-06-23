const content = `
The \`Color\` class provides a robust and flexible way to manipulate and convert colors. It supports various color formats and offers numerous methods to adjust and analyze colors.

## Initialization

Create a new instance of the \`Color\` class by passing a color in any supported format. If the color format is invalid, the instance will initialize with an empty string.

\`\`\`typescript
const color = new Color('#3498db');
\`\`\`

## Methods

### Format Conversion

These methods return the color in different formats without modifying the internal state:

- \`hex()\`: Returns the color in HEX format.
- \`hexa()\`: Returns the color in HEXA (HEX with Alpha) format.
- \`rgb()\`: Returns the color in RGB format.
- \`rgba()\`: Returns the color in RGBA format.
- \`hsl()\`: Returns the color in HSL format.
- \`hsla()\`: Returns the color in HSLA format.
- \`hsv()\`: Returns the color in HSV format.
- \`cmyk()\`: Returns the color in CMYK format.

\`\`\`typescript
const color = new Color('#3498db');
console.log(color.rgb()); // Outputs: 'rgb(52, 152, 219)'
console.log(color.hex()); // Outputs: '#3498db'
\`\`\`

### Color Manipulation

Each manipulation method has two variants:
- **Apply Variant**: Modifies the internal color and returns the new color.
- **With Variant**: Returns the modified color without changing the internal state.

#### Opacity

- \`applyOpacity(opacity: number)\`: Applies the specified opacity to the color and updates it.
- \`withOpacity(opacity: number)\`: Returns a new color with the specified opacity without updating the current color.

\`\`\`typescript
const color = new Color('rgba(52, 152, 219, 1)');
console.log(color.applyOpacity(0.5)); // Changes and returns: 'rgba(52, 152, 219, 0.5)'
console.log(color.withOpacity(0.7)); // Returns: 'rgba(52, 152, 219, 0.7)' without changing the internal color
\`\`\`

#### Brightness

- \`applyBrightness(amount: number)\`: Adjusts the brightness by the specified amount and updates the color.
- \`withBrightness(amount: number)\`: Returns a new color with adjusted brightness without updating the internal color.

\`\`\`typescript
const color = new Color('#3498db');
console.log(color.applyBrightness(10)); // Changes and returns: '#60aef1'
console.log(color.withBrightness(10)); // Returns: '#60aef1' without changing the internal color
\`\`\`

#### Saturation

- \`applySaturation(amount: number)\`: Adjusts the saturation by the specified amount and updates the color.
- \`withSaturation(amount: number)\`: Returns a new color with adjusted saturation without updating the internal color.

\`\`\`typescript
const color = new Color('#3498db');
console.log(color.applySaturation(-20)); // Changes and returns: '#4c9fc7'
console.log(color.withSaturation(-20)); // Returns: '#4c9fc7' without changing the internal color
\`\`\`

#### Hue

- \`applyHue(amount: number)\`: Adjusts the hue by the specified amount and updates the color.
- \`withHue(amount: number)\`: Returns a new color with adjusted hue without updating the internal color.

\`\`\`typescript
const color = new Color('#3498db');
console.log(color.applyHue(30)); // Changes hue by 30 degrees and returns the new color
console.log(color.withHue(30)); // Returns new color with hue adjusted by 30 degrees without changing the internal color
\`\`\`

#### Inversion

- \`applyInvert()\`: Inverts the color and updates it.
- \`withInvert()\`: Returns the inverted color without updating the internal color.

\`\`\`typescript
const color = new Color('#3498db');
console.log(color.applyInvert()); // Changes and returns: '#cb6734'
console.log(color.withInvert()); // Returns: '#cb6734' without changing the internal color
\`\`\`

#### Tinting

- \`applyTint(percentage: number)\`: Tints the color by mixing it with white by the specified percentage and updates it.
- \`withTint(percentage: number)\`: Returns a new tinted color without updating the internal color.

\`\`\`typescript
const color = new Color('#3498db');
console.log(color.applyTint(30)); // Changes and returns: tinted color
console.log(color.withTint(30)); // Returns: tinted color without changing the internal color
\`\`\`

#### Shading

- \`applyShade(percentage: number)\`: Shades the color by mixing it with black by the specified percentage and updates it.
- \`withShade(percentage: number)\`: Returns a new shaded color without updating the internal color.

\`\`\`typescript
const color = new Color('#3498db');
console.log(color.applyShade(30)); // Changes and returns: shaded color
console.log(color.withShade(30)); // Returns: shaded color without changing the internal color
\`\`\`

#### Sepia

- \`applySepia()\`: Applies a sepia effect and updates the color.
- \`withSepia()\`: Returns the color with a sepia effect without updating the internal color.

\`\`\`typescript
const color = new Color('#3498db');
console.log(color.applySepia()); // Changes and returns: color with sepia effect
console.log(color.withSepia()); // Returns: color with sepia effect without changing the internal color
\`\`\`

#### Grayscale

- \`applyGrayscale()\`: Applies a grayscale effect and updates the color.
- \`withGrayscale()\`: Returns the color with a grayscale effect without updating the internal color.

\`\`\`typescript
const color = new Color('#3498db');
console.log(color.applyGrayscale()); // Changes and returns: color with grayscale effect
console.log(color.withGrayscale()); // Returns: color with grayscale effect without changing the internal color
\`\`\`

### Color Properties

These methods provide insights into the color:

- \`extractOpacity()\`: Extracts and returns the opacity value of the color.
- \`parseNumbers(format: ColorFormat)\`: Parses the color components into numeric values based on the specified format.
- \`luminance()\`: Calculates and returns the luminance of the color.
- \`isLight()\`: Returns \`true\` if the color is considered light, \`false\` otherwise.
- \`isDark()\`: Returns \`true\` if the color is considered dark, \`false\` otherwise.

\`\`\`typescript
const color = new Color('#3498db');
console.log(color.extractOpacity()); // Returns: { opacity: 1, color: 'rgb(52, 152, 219)' }
console.log(color.parseNumbers(ColorFormat.RGB)); // Returns: { r: 52, g: 152, b: 219 }
console.log(color.luminance()); // Returns: luminance value
console.log(color.isLight()); // Returns: true or false
console.log(color.isDark()); // Returns: true or false
\`\`\`

## Example Usage

\`\`\`typescript
const color = new Color('#3498db');
console.log(color.rgb()); // Converts initial color to RGB: 'rgb(52, 152, 219)'
console.log(color.applyOpacity(0.5)); // Changes opacity and updates the current color to 'rgba(52, 152, 219, 0.5)'
console.log(color.withOpacity(0.7)); // Returns new opacity without changing the current color: 'rgba(52, 152, 219, 0.7)'
console.log(color.applySepia()); // Applies sepia and updates the current color to sepia version
console.log(color.withSepia()); // Returns sepia version without changing the current color
\`\`\`

## Summary

The \`Color\` class offers a comprehensive toolset for managing and manipulating colors. With support for multiple formats and a wide range of methods, it provides an efficient way to handle color adjustments and transformations in your application.
`;

export { content };
