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

### Handling Invalid Color Formats

The function handles invalid color formats gracefully by using white as a fallback.

\`\`\`typescript
const color = "invalidColor";
  
const sepiaColor = applySepia(color);
console.log(sepiaColor); // Uses white as fallback and applies sepia effect
\`\`\`
`;

export { content };
