const content = `
The \`convertColor\` function is designed to convert color values between different formats. It supports a range of color formats including HEX, HEXA, RGB, HSL, HSLA, CMYK, and HSV. This function first determines the input color's format, then converts it to an intermediate RGBA format before finally converting it to the desired output format.

## Arguments

- \`color\` (string): The color value to be converted. The color must be in a recognized format.
- \`toFormat\` ([ColorFormat](/enum-color-format)): The target color format to which the input color will be converted. This should be one of the supported \`ColorFormat\` enumeration values.

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

### Error Handling
If the input color is in an invalid or unrecognized format, the function will throw an error.

\`\`\`typescript
try {
  const invalidColor = "invalidColor";
  const convertedColor = convertColor(invalidColor, ColorFormat.HEX);
} catch (error) {
  console.error(error); // Output: Error: Invalid color format
}
\`\`\`
`;

export { content };
