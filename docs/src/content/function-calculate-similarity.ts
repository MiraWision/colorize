const content = `
The \`calculateSimilarity\` function determines how similar two colors are by calculating the Euclidean distance between their RGB components. This distance is then converted to a percentage similarity score.

## Arguments

- \`color1\` (Color | string): The first color for comparison. Can be a color string or a Color instance.
- \`color2\` (Color | string): The second color for comparison. Can be a color string or a Color instance.

## Returns

- (number): A similarity percentage where 100% means the colors are identical and 0% means they are completely different.

## Usage Examples

### Comparing Colors

\`\`\`typescript
const color1 = "#ff0000"; // Red color
const color2 = "#00ff00"; // Green color

const similarity = calculateSimilarity(color1, color2);
console.log(similarity);
// Output: A percentage indicating how similar red and green are
\`\`\`

### Comparing Colors Using Color Instances

\`\`\`typescript
const color1 = new Color('#ff0000'); // Red color
const color2 = new Color('#00ff00'); // Green color

const similarity = calculateSimilarity(color1, color2);
console.log(similarity);
// Output: A percentage indicating how similar red and green are
\`\`\`

### Handling Invalid Color Formats

The function handles invalid color formats gracefully by using white as a fallback.

\`\`\`typescript
const color1 = "invalidColor";
const color2 = "#00ff00";
  
const similarity = calculateSimilarity(color1, color2);
console.log(similarity); // Uses white as fallback for the first color
\`\`\`
`;

export { content };
