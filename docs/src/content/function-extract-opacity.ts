const content = `
The \`extractOpacity\` function parses a color string and extracts its opacity value. It supports color formats that include opacity, such as Hexa, RGBA, and HSLA.

## Arguments

- \`color\` (string): The color in a format that includes opacity (Hexa, RGBA, or HSLA).

## Returns

- An object containing two properties:
  - \`color\`: The color string without the opacity component.
  - \`opacity\`: The extracted opacity as a number.

## Usage Examples

### Extracting opacity from an RGBA color

\`\`\`typescript
const rgbaResult = extractOpacity('rgba(255, 99, 71, 0.5)');
console.log(rgbaResult.opacity); // Outputs: 0.5
console.log(rgbaResult.color); // Outputs: 'rgb(255, 99, 71)'
\`\`\`

### Extracting opacity from an HSLA color

\`\`\`typescript
const hslaResult = extractOpacity('hsla(9, 100%, 64%, 0.75)');
console.log(hslaResult.opacity); // Outputs: 0.75
console.log(hslaResult.color); // Outputs: 'hsl(9, 100%, 64%)'
\`\`\`
`;

export { content };
