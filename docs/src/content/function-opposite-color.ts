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

### Handling Invalid Color Formats

The function handles invalid color formats gracefully by using white as a fallback.

\`\`\`typescript
const color = "invalidColor";
  
const opposite = oppositeColor(color);
console.log(opposite); // Uses white as fallback and finds its opposite
\`\`\`
`;

export { content };
