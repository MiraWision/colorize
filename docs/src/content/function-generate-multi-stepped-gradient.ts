const content = `
The \`generateMultiSteppedGradient\` function creates a complex gradient based on multiple colors and the specified number of steps between each color. It allows for the generation of gradients that transition through several colors with control over the transition smoothness between each pair.

## Arguments

- ...\`colorSteps\` ([string, number, string, ...]): An list of arguments where each color (except the last one) is followed by a number indicating the steps to the next color.

## Returns

- (string[]): Color strings representing the gradient.

## Usage Example

\`\`\`typescript
// Generating a gradient from red to green to blue
const gradient = generateMultiSteppedGradient(["#FF0000", 1, "#00FF00", 1, "#0000FF"]);
console.log(gradient);
// Outputs: ["#FF0000", "#808000", "#00FF00", "#008080", "#0000FF"]
\`\`\`
`;

export { content };
