const content = `
The \`blendMultipleColors\` function blends multiple colors together based on their specified weights, producing a new color that is a mix of the input colors. Each color's weight determines its contribution to the resulting blend.

## Arguments

- \`colorWeights\` (Array<{ color: string, weight: number }>): An array of objects, each containing:
  - \`color\` (string): The color to blend in a recognized color format (e.g., HEX, RGB, HSL).
  - \`weight\` (number): A positive number that determines the contribution of this color to the final blend. Weights are normalized internally so they don't need to sum to 1.

## Returns

- (string): The resulting blended color in the same format as the first color in the \`colorWeights\` array.

## Example Usage

### Blending Multiple Colors

\`\`\`typescript
const colors = [
  { color: '#FF0000', weight: 1 }, // Red with weight 1
  { color: '#00FF00', weight: 1 }, // Green with weight 1
  { color: '#0000FF', weight: 2 }  // Blue with weight 2
];

const blendedColor = blendMultipleColors(colors);
console.log(blendedColor);
// Output: #404080 - a color that is a blend of red, green, and blue with blue having twice the weight.
\`\`\`

### Blending Different Color Formats

\`\`\`typescript
const colors = [
  { color: 'rgb(255, 0, 0)', weight: 1 },  // Red
  { color: 'hsl(240, 100%, 50%)', weight: 2 } // Blue
];

const blendedColor = blendMultipleColors(colors);
console.log(blendedColor);
// Output: rgb(85, 0, 170) - a blend in the RGB format,.
\`\`\`

### Blending Colors with Non-Uniform Weights

\`\`\`typescript
const colors = [
  { color: '#FF0000', weight: 0.5 }, // Red with weight 0.5
  { color: '#0000FF', weight: 1.5 }  // Blue with weight 1.5
];

const blendedColor = blendMultipleColors(colors);
console.log(blendedColor);
// Output: #4000bf - a color that is more influenced by blue due to its higher weight.
\`\`\`

### Error Handling

The function throws an error if:
- The \`colorWeights\` array is empty.
- Any \`color\` in the \`colorWeights\` array is in an invalid format.
- Any \`weight\` in the \`colorWeights\` array is not a positive number.
- The sum of the weights is zero or negative.

\`\`\`typescript
try {
  const colors = [
    { color: 'invalidColor', weight: 1 }, 
    { color: '#0000FF', weight: 1 }
  ];

  const blendedColor = blendMultipleColors(colors);
} catch (error) {
  console.error(error); // Output: Error: Invalid color format for color: invalidColor
}

try {
  const colors = [
    { color: '#FF0000', weight: -1 }, // Negative weight
    { color: '#0000FF', weight: 1 }
  ];

  const blendedColor = blendMultipleColors(colors);
} catch (error) {
  console.error(error); // Output: Error: Total weight must be greater than zero.
}
\`\`\`
`;

export { content };
