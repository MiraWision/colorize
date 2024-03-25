const content = `
The \`calculateContrast\` function calculates the contrast ratio between two colors. This ratio is crucial for determining the legibility of text on a background, especially in web design and accessibility.

## Arguments

- \`color1\` (string): The first color in any supported format.
- \`color2\` (string): The second color in any supported format.

## Returns

- (number): The contrast ratio between the two colors, which is a value between 1 and 21, with 21 being the highest possible contrast.

## Usage Example

### Calculating maximum contrast

\`\`\`typescript
const contrastRatio = calculateContrast('#FFFFFF', '#000000');
console.log(contrastRatio); // Outputs 21, indicating maximum contrast.
\`\`\`

### Calculating contrast between two colors

\`\`\`typescript
const contrastRatio = calculateContrast('#FF0000', '#00FF00');
console.log(contrastRatio); // Outputs the contrast ratio between red and green.
\`\`\`
`;

export { content };
