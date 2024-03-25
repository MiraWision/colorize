const content = `
The \`isLight\` function determines if a given color is considered light. This determination is based on the luminance of the color, where colors with a luminance greater than 0.5 are considered light.

## Arguments

- \`color\` (string): The color in any supported format.

## Returns

- (boolean): True if the color is light, false otherwise.

## Usage Example

### Determining if a color is light

\`\`\`typescript
const colorIsLight = isLight('#FF0000');
console.log(colorIsLight); // Outputs false as red is not considered a light color.
\`\`\`

### Checking a light color

\`\`\`typescript
const colorIsLight = isLight('#FFFFFF');
console.log(colorIsLight); // Outputs true as white is considered a light color.
\`\`\`
`;

export { content };
