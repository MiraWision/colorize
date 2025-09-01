import { Routes } from '../routes';

const content = `
The \`convertColor\` function is designed to convert color values between different formats. It supports a range of color formats including HEX, HEXA, RGB, HSL, HSLA, CMYK, and HSV. This function first determines the input color's format, then converts it to an intermediate RGBA format before finally converting it to the desired output format.

## Arguments

- \`color\` (string): The color value to be converted. The color must be in a recognized format.
- \`toFormat\` ([ColorFormat](${Routes.EnumColorFormat})): The target color format to which the input color will be converted. This should be one of the supported \`ColorFormat\` enumeration values.

## Returns

- (string): The converted color in the target format. If the input color is already in the desired format, it is returned as is.

## Usage Examples

### Converting HEX to RGB

\`\`\`typescript
const hexColor = "#FF5733";
const rgbColor = convertColor(hexColor, ColorFormat.RGB);
console.log(rgbColor); // Output: "rgb(255, 87, 51)"
\`\`\`

### Converting RGB to CMYK

\`\`\`typescript
const rgbColor = "rgb(255, 87, 51)";
const cmykColor = convertColor(rgbColor, ColorFormat.CMYK);
console.log(cmykColor); // Output: "cmyk(0%, 66%, 80%, 0%)"
\`\`\`

### Handling Invalid Color Formats

The function handles invalid color formats gracefully by using white as a fallback.

\`\`\`typescript
const invalidColor = "invalidColor";
const convertedColor = convertColor(invalidColor, ColorFormat.HEX);
console.log(convertedColor); // Output: "#FFFFFF" (white as fallback)
\`\`\`
`;

export { content };
