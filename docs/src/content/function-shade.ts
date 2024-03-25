const content = `
The \`shade\` function creates a shade of the given color by mixing it with black. This process darkens the original color, which is particularly useful for creating darker color variants or achieving a shading effect.

## Arguments

- \`color\` (string): The color to be shaded, in hexadecimal format.
- \`weight\` (number): The percentage of black to mix into the color, between 0 and 1.

## Returns

- (string): The shaded color in hexadecimal format.

## Usage Example

### Creating a dark red shade

\`\`\`typescript
const darkRed = shade("#FF0000", 0.5); // Mixes red with 50% black, creating a dark red shade.
console.log(darkRed); // Outputs the shaded color's hexadecimal value.
\`\`\`

### Shading with a different weight

\`\`\`typescript
const darkBlue = shade("#0000FF", 0.3); // Mixes blue with 30% black, creating a dark blue shade.
console.log(darkBlue); // Outputs the shaded color's hexadecimal value.
\`\`\`
`;

export { content };
