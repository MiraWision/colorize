const content = `
The \`applyGreyscale\` function converts a color to its grayscale equivalent using the luminosity method. This is essential for creating grayscale versions of colors for filtering or aesthetic purposes.

## Arguments

- \`color\` (\`string\`): The color in any supported format.

## Returns

- (\`string\`): The grayscale equivalent of the color in RGB format.

## Usage Example

### Convert a color to grayscale

\`\`\`typescript
const grayscaleColor = applyGreyscale('#FF6347');
console.log(grayscaleColor); // Outputs "rgb(130, 130, 130)"
\`\`\`

### Handle an unsupported color format

\`\`\`typescript
try {
  const result = applyGreyscale('unsupported-color-format');
  console.log(result);
} catch (error) {
  console.error(error); // Error handling for unsupported color formats
}
\`\`\`
`;

export { content };
