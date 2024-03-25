const content = `
The \`tint\` function creates a tint of the given color by mixing it with white. This process lightens the original color, providing a useful method for generating lighter color variants.

## Arguments

- \`color\` (string): The color to be tinted, in hexadecimal format.
- \`weight\` (number): The percentage of white to mix into the color, between 0 and 1.

## Returns

- (string): The tinted color in hexadecimal format.

## Usage Example

### Creating a light red tint

\`\`\`typescript
const lightRed = tint("#FF0000", 0.5); // Mixes red with 50% white, creating a light red tint.
console.log(lightRed); // Outputs the tinted color's hexadecimal value.
\`\`\`

### Tinting with a different weight

\`\`\`typescript
const lightBlue = tint("#0000FF", 0.3); // Mixes blue with 30% white, creating a light blue tint.
console.log(lightBlue); // Outputs the tinted color's hexadecimal value.
\`\`\`
`;

export { content };
