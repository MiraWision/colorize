const content = `
The \`getLuminance\` function calculates the luminance of a given color. Luminance is a measure of the brightness of a color as perceived by the human eye, based on the specific weights for each color component defined by the sRGB color space.

## Arguments

- \`color\` (string): The color in any supported format.

## Returns

- (number): The luminance of the color, a value between 0 and 1.

## Usage Example

### Basic usage

\`\`\`typescript
const luminance = getLuminance('#FF0000');
console.log(luminance); // Outputs the luminance of red.
\`\`\`

### Handling an invalid color format

\`\`\`typescript
try {
  const luminance = getLuminance('invalidColor');
  console.log(luminance);
} catch (error) {
  console.error(error); // Outputs the error message
}
\`\`\`
`;

export { content };
