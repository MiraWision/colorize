const content = `
The \`blendColors\` function blends two colors together based on a specified weight, producing a new color that is a mix of the two input colors. The weight determines the proportion of each color in the resulting blend.

## Arguments

- \`fromColor\` (string): The starting color in a valid color format.
- \`toColor\` (string): The ending color in a valid color format.
- \`weight\` (number): A value between 0 and 1 that determines the weight of the blend. A weight of 0 will result in the first color, while a weight of 1 will result in the second color.

## Returns

- (string): The resulting blended color in the same format as the input colors.

## Usage Examples

### Blending Two RGB Colors

\`\`\`typescript
const fromColor = "rgb(255, 0, 0)"; // Red
const toColor = "rgb(0, 0, 255)"; // Blue
const weight = 0.5; // Equal mix

const blendedColor = blendColors(fromColor, toColor, weight);
console.log(blendedColor);
// Output: rgb(128, 0, 128) - a purple color
\`\`\`

### Error Handling

The function throws an error if either \`fromColor\` or \`toColor\` is in an invalid color format.

\`\`\`typescript
try {
  const fromColor = "invalidColor";
  const toColor = "rgb(0, 0, 255)";
  const weight = 0.5;
  
  const blendedColor = blendColors(fromColor, toColor, weight);
} catch (error) {
  console.error(error); // Output: Error: Invalid color format
}
\`\`\`
`;

export { content };
