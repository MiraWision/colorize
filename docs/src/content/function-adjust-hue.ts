const content = `
The \`adjustHue\` function is designed to modify the hue of a specified color. By adjusting the hue component in the HSL (Hue, Saturation, Lightness) representation of the color, this function can shift the color to a different hue.

## Arguments

- \`color\` (string): The color whose hue is to be adjusted, provided in a valid color format.
- \`amount\` (number): The amount by which the hue should be adjusted. This value can be positive or negative, representing a clockwise or counter-clockwise shift on the color wheel, respectively.

## Returns

- (string): The resulting color with adjusted hue, returned in the same format as the input color.

## Usage Examples

### Shifting Hue Clockwise

\`\`\`typescript
const color = "hsl(30, 100%, 50%)"; // A bright orange color
const amount = 45; // Shift hue by 45 degrees

const newHueColor = adjustHue(color, amount);
console.log(newHueColor);
// Output: "hsl(75, 100%, 50%)" - a more yellow color
\`\`\`

### Shifting Hue Counter-Clockwise

\`\`\`typescript
const color = "#3498db"; // A blue color
const amount = -60; // Shift hue by -60 degrees

const newHueColor = adjustHue(color, amount);
console.log(newHueColor);
// Output: "#34db98" - a more greenish color
\`\`\`

### Error Handling

The function throws an error if the input color is in an invalid format.

\`\`\`typescript
try {
  const color = "invalidColor";
  const amount = 90;
  
  const adjustedColor = adjustHue(color, amount);
} catch (error) {
  console.error(error); // Output: Error: Invalid color format
}
\`\`\`
`;

export { content };
