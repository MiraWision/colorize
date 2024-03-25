const content = `
The \`generateSteppedGradient\` function generates an array of color strings representing the stepped gradient between two colors. It calculates intermediate colors in the gradient from the starting color (\`fromColor\`) to the ending color (\`toColor\`) based on the specified number of steps (\`count\`). This function is useful for creating color transitions and gradients programmatically.

## Arguments

- \`fromColor\` (string): The starting color of the gradient in a valid color format.
- \`toColor\` (string): The ending color of the gradient in a valid color format.
- \`count\` (number): The number of intermediate colors to generate. The actual number of colors in the returned array will be \`count\` plus two for the start and end colors.

## Returns

- (string[]): An array of color strings in the same format as \`fromColor\`, representing the intermediate colors in the gradient.

## Usage Examples

### Generating a Simple RGB Gradient

\`\`\`typescript
const fromColor = "rgb(255, 0, 0)"; // Red
const toColor = "rgb(0, 0, 255)"; // Blue
const count = 3;

const gradient = generateSteppedGradient(fromColor, toColor, count);
console.log(gradient);
// Output: ["rgb(191, 0, 64)", "rgb(128, 0, 128)", "rgb(64, 0, 191)"]
\`\`\`

### Error Handling

The function throws an error if either \`fromColor\` or \`toColor\` is in an invalid color format.

\`\`\`typescript
try {
  const fromColor = "invalidColor";
  const toColor = "rgb(0, 0, 255)";
  const count = 3;
  
  const gradient = generateSteppedGradient(fromColor, toColor, count);
} catch (error) {
  console.error(error); // Output: Error: Invalid color format
}
\`\`\`
`;

export { content };
