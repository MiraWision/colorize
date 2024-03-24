const content = `
# \`generateComplexGradient\` Function

## Description

The \`generateComplexGradient\` function creates a complex stepped color gradient between multiple colors. It generates a series of intermediate colors, forming a gradient between each pair of specified colors, according to the number of steps defined between them. The function allows for the creation of multi-stage gradients where each segment can have a different number of steps.

## Arguments

- \`...args\`: A sequence of alternating colors and step counts. Each color, except for the last one, should be followed by a number representing the steps to the next color. The color should be in a string format recognized by the \`getColorFormat\` and \`convertColor\` functions. The steps are integers that determine the number of intermediate colors to generate for the segment leading to the next color.

## Returns

- \`string[]\`: An array of color strings representing the complex gradient. It includes all the specified colors and the generated intermediate colors between each pair. The color format of the output matches the format of the first provided color.

## Errors

- Throws an error if the function is called with an incorrect pattern of arguments (e.g., missing steps between colors or incorrect types).

## Example Usage

\`\`\`typescript
// Generates a gradient from red to yellow in 3 steps, then from yellow to green in 4 steps.
const gradient = generateComplexGradient("#ff0000", 3, "#ffff00", 4, "#00ff00");
console.log(gradient);
// Output: An array of 8 colors, starting with red, transitioning to yellow, then to green.
\`\`\`
`;

export { content };
