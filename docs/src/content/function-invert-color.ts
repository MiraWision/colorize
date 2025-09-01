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

### Handling Invalid Color Formats

The function handles invalid color formats gracefully by using white as a fallback.

\`\`\`typescript
const color = "invalidColor";
  
const invertedColor = invertColor(color);
console.log(invertedColor); // Uses white as fallback and inverts it
\`\`\`
`;

export { content };
