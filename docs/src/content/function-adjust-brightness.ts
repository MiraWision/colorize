const content = `
The \`adjustBrightness\` function adjusts the brightness of a given color by a specified amount. It operates on the luminance value in the HSL color space, increasing or decreasing it to make the color brighter or darker.

## Arguments

- \`color\` (string): The color to be adjusted, in a valid color format.
- \`amount\` (number): The amount by which to adjust the brightness. Positive values increase brightness, while negative values decrease it.

## Returns

- (string): The color with adjusted brightness, returned in the same format as the input color.

## Usage Examples

### Increasing Brightness

\`\`\`typescript
const color = "hsl(100, 50%, 50%)"; // A medium light green
const amount = 20; // Increase brightness by 20%

const brighterColor = adjustBrightness(color, amount);
console.log(brighterColor);
// Output: "hsl(100, 50%, 70%)" - a lighter green
\`\`\`

### Decreasing Brightness

\`\`\`typescript
const color = "rgb(130, 200, 100)"; // A bright green
const amount = -30; // Decrease brightness by 30%

const darkerColor = adjustBrightness(color, amount);
console.log(darkerColor);
// Output: "rgb(91, 140, 70)" - a darker green
\`\`\`

### Error Handling

The function throws an error if the input color is in an invalid format.

\`\`\`typescript
try {
  const color = "invalidColor";
  const amount = 20;
  
  const adjustedColor = adjustBrightness(color, amount);
} catch (error) {
  console.error(error); // Output: Error: Invalid color format
}
\`\`\`
`;

export { content };
