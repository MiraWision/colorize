const content = `
The \`adjustSaturation\` function is designed to modify the saturation of a specified color. By adjusting the saturation component in the HSL (Hue, Saturation, Lightness) representation of the color, this function can either increase or decrease the color's intensity.

## Arguments

- \`color\` (string): The color whose saturation is to be adjusted, provided in a valid color format.
- \`amount\` (number): The amount by which the saturation should be adjusted. Positive values increase saturation, making the color more vivid, while negative values decrease saturation, making the color more muted.

## Returns

- (string): The resulting color with adjusted saturation, returned in the same format as the input color.

## Usage Examples

### Increasing Saturation

\`\`\`typescript
const color = "hsl(30, 50%, 50%)"; // A moderate saturation color
const amount = 20; // Increase saturation by 20%

const moreVividColor = adjustSaturation(color, amount);
console.log(moreVividColor);
// Output: "hsl(30, 70%, 50%)" - a more vivid color
\`\`\`

### Decreasing Saturation

\`\`\`typescript
const color = "rgb(255, 0, 0)"; // A fully saturated red
const amount = -50; // Decrease saturation by 50%

const lessVividColor = adjustSaturation(color, amount);
console.log(lessVividColor);
// Output: "hsl(0, 50%, 50%)" - a less vivid red
\`\`\`

### Error Handling

The function throws an error if the input color is in an invalid format.

\`\`\`typescript
try {
  const color = "invalidColor";
  const amount = 20;
  
  const adjustedColor = adjustSaturation(color, amount);
} catch (error) {
  console.error(error); // Output: Error: Invalid color format
}
\`\`\`
`;

export { content };
