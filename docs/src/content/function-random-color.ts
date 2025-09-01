const content = `
The \`randomColor\` function generates a random color in the specified format. By default, it generates a color in HEX format.

## Arguments

- \`format\` (ColorFormat): The desired color format for the random color. This can be one of 'hex', 'hexa', 'rgb', 'rgba', 'hsl', 'hsla', 'hsv', 'cmyk'. Default is 'hex'.

## Returns

- (string): A random color in the specified format.

## Usage Examples

### Generating a Random Color in HEX Format

\`\`\`typescript
const color = randomColor();
console.log(color);
// Output: "#1a2b3c" - a random color in HEX format
\`\`\`

### Generating a Random Color in RGB Format

\`\`\`typescript
const color = randomColor('rgb');
console.log(color);
// Output: "rgb(123, 45, 67)" - a random color in RGB format
\`\`\`

### Generating a Random Color in HSL Format

\`\`\`typescript
const color = randomColor('hsl');
console.log(color);
// Output: "hsl(240, 100%, 50%)" - a random color in HSL format
\`\`\`

### Handling Invalid Color Formats

The function handles invalid color formats gracefully by using white as a fallback.

\`\`\`typescript
const color = randomColor('unsupportedFormat');
console.log(color); // Uses white as fallback in the specified format
\`\`\`
`;

export { content };
