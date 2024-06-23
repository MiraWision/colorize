const content = `
The \`oppositeColor\` function calculates the complementary (opposite) color by shifting the hue by 180 degrees. This can be useful in design to create contrast and harmony.

## Arguments

- \`color\` (string): The color for which to find the opposite, provided in a valid color format.

## Returns

- (string): The opposite color, returned in the same format as the input color.

## Usage Examples

### Finding the Opposite Color

\`\`\`typescript
const color = "#3498db"; // A blue color

const opposite = oppositeColor(color);
console.log(opposite);
// Output: "#db9834" - an orange color, which is the opposite of blue
\`\`\`

### Error Handling

The function throws an error if the input color is in an invalid format.

\`\`\`typescript
try {
  const color = "invalidColor";
  
  const opposite = oppositeColor(color);
} catch (error) {
  console.error(error); // Output: Error: Invalid color format
}
\`\`\`
`;

export { content };
