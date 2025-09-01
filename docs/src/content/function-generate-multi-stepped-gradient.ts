const content = `
The \`generateMultiSteppedGradient\` function creates a complex gradient based on multiple colors and the specified number of steps between each color. It allows for the generation of gradients that transition through several colors with control over the transition smoothness between each pair.

## Arguments

- ...\`colorSteps\` ([Color | string, number, Color | string, ...]): An list of arguments where each color (except the last one) is followed by a number indicating the steps to the next color.

## Returns

- (string[]): Color strings representing the gradient.

## Usage Example

\`\`\`typescript
// Generating a gradient from red to green to blue
const gradient = generateMultiSteppedGradient(["#FF0000", 1, "#00FF00", 1, "#0000FF"]);
console.log(gradient);
// Outputs: ["#FF0000", "#808000", "#00FF00", "#008080", "#0000FF"]
\`\`\`

### Handling Invalid Color Formats

The function handles invalid color formats gracefully by using white as a fallback.

\`\`\`typescript
const gradient = generateMultiSteppedGradient(["invalidColor", 1, "#00FF00", 1, "#0000FF"]);
console.log(gradient); // Uses white as fallback for invalid color
\`\`\`

### Error Handling

The function throws an error if the arguments don't follow the correct pattern.

\`\`\`typescript
try {
  const gradient = generateMultiSteppedGradient(["#FF0000", 1, "#00FF00"]); // Missing last color
} catch (error) {
  console.error(error); // Output: Error: Function must be called with at least one color and one step count, in an interleaved manner.
}
\`\`\`
`;

export { content };
