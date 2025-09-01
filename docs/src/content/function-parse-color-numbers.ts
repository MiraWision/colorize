const content = `
The \`parseColorNumbers\` function converts a color string into an object containing the numerical values of its components. The function can convert and parse RGB, RGBA, HSL, and HSLA color formats.

## Arguments

- \`color\` (string): The color string to be converted and parsed.
- \`format\` ('rgb' | 'rgba' | 'hsl' | 'hsla'): The format to which the color should be converted and parsed.

## Returns

- Object: An object containing the numerical values of the color components. The structure of the returned object depends on the specified format.

## Usage Examples

### Parsing RGB

\`\`\`typescript
const result = parseColorNumbers('rgb(255, 87, 51)', ColorFormat.RGB);
console.log(result); // { r: 255, g: 87, b: 51 }
\`\`\`

### Parsing RGBA

\`\`\`typescript
const result = parseColorNumbers('rgba(255, 87, 51, 0.5)', ColorFormat.RGBA);
console.log(result); // { r: 255, g: 87, b: 51, a: 0.5 }
\`\`\`

### Parsing HSL

\`\`\`typescript
const result = parseColorNumbers('hsl(30, 100%, 50%)', ColorFormat.HSL);
console.log(result); // { h: 30, s: 100, l: 50 }
\`\`\`

### Parsing HSLA

\`\`\`typescript
const result = parseColorNumbers('hsla(30, 100%, 50%, 0.5)', ColorFormat.HSLA);
console.log(result); // { h: 30, s: 100, l: 50, a: 0.5 }
\`\`\`

### Handling Invalid Color Formats

The function handles invalid color formats gracefully by using white as a fallback.

\`\`\`typescript
const result = parseColorNumbers('invalidColor', ColorFormat.RGB);
console.log(result); // { r: 255, g: 255, b: 255 } (white values)
\`\`\`

### Error Handling

The function throws an error if an invalid format is specified.

\`\`\`typescript
try {
  const result = parseColorNumbers('rgb(255, 87, 51)', 'invalidFormat' as any);
} catch (error) {
  console.error(error); // Output: Error: Invalid format specified
}
\`\`\`
`;

export { content };
