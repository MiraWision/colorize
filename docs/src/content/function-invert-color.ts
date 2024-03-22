const content = `
The \`invertColor\` function calculates the inverse of a given color. Inversion is performed by subtracting each of the RGB values from 255, effectively providing the complementary color. This function can be useful for creating high-contrast color schemes or for effects that require the negation of a color.

## Arguments

- \`color\` (string): The color to be inverted, provided in a valid color format.

## Returns

- (string): The inverted color, returned in the same format as the input color.

## Usage Examples

### Inverting a Color

\`\`\`typescript
const color = "rgb(100, 150, 200)"; // A sample color
const invertedColor = invertColor(color);
console.log(invertedColor);
// Output: "rgb(155, 105, 55)" - the inverted color
\`\`\`

### Error Handling

The function throws an error if the input color is in an invalid format.

\`\`\`typescript
try {
  const color = "invalidColor";
  
  const invertedColor = invertColor(color);
} catch (error) {
  console.error(error); // Output: Error: Invalid color format
}
\`\`\`
`;

export { content };
