const content = `
The \`parseNumbers\` function converts a color string into an object containing the numerical values of its components. The function can convert and parse RGB, RGBA, HSL, and HSLA color formats.

## Arguments

- \`color\` (string): The color string to be converted and parsed.
- \`format\` ('rgb' | 'rgba' | 'hsl' | 'hsla'): The format to which the color should be converted and parsed.

## Returns

- Object: An object containing the numerical values of the color components. The structure of the returned object depends on the specified format.

## Usage Examples

### Parsing RGB

\`\`\`typescript
const result = parseNumbers('rgb(255, 87, 51)', 'rgb');
console.log(result); // { r: 255, g: 87, b: 51 }
\`\`\`

### Parsing RGBA

\`\`\`typescript
const result = parseNumbers('rgba(255, 87, 51, 0.5)', 'rgba');
console.log(result); // { r: 255, g: 87, b: 51, a: 0.5 }
\`\`\`

### Parsing HSL

\`\`\`typescript
const result = parseNumbers('hsl(30, 100%, 50%)', 'hsl');
console.log(result); // { h: 30, s: 100, l: 50 }
\`\`\`

### Parsing HSLA

\`\`\`typescript
const result = parseNumbers('hsla(30, 100%, 50%, 0.5)', 'hsla');
console.log(result); // { h: 30, s: 100, l: 50, a: 0.5 }
\`\`\`
`;

export { content };
