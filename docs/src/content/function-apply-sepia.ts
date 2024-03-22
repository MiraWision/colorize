const content = `
The \`applySepia\` function transforms a given color into its sepia equivalent. This transformation adjusts the RGB values based on a predefined formula to produce the warm brown tones typical of sepia images. This function is useful for applying a vintage or old-fashioned look to colors.

## Arguments

- \`color\` (string): The color to be transformed into sepia, provided in a valid color format.

## Returns

- (string): The sepia-toned color, returned in the same format as the input color.

## Usage Examples

### Applying Sepia Tone

\`\`\`typescript
const color = "rgb(100, 150, 200)"; // A sample color
const sepiaColor = applySepia(color);
console.log(sepiaColor);
// Output: "rgb(192, 171, 123)" - the sepia-toned color
\`\`\`

### Error Handling

The function throws an error if the input color is in an invalid format.

\`\`\`typescript
try {
  const color = "invalidColor";
  
  const sepiaColor = applySepia(color);
} catch (error) {
  console.error(error); // Output: Error: Invalid color format
}
\`\`\`
`;

export { content };
