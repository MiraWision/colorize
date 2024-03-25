const content = `
The \`isDark\` function determines if a given color is considered dark. It assesses this based on the color's luminance, considering colors with a luminance of 0.5 or less to be dark.

## Arguments

- \`color\` (string): The color in any supported format.

## Returns

- (boolean): \`true\` if the color is dark, \`false\` otherwise.

## Usage Example

### Determining if a color is dark

\`\`\`typescript
const colorIsDark = isDark('#FF0000');
console.log(colorIsDark); // Outputs true as red is considered a dark color.
\`\`\`

### Checking a light color

\`\`\`typescript
const colorIsDark = isDark('#FFFFFF');
console.log(colorIsDark); // Outputs false as white is not considered a dark color.
\`\`\`
`;

export { content };
