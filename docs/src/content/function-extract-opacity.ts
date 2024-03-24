const content = `
The \`extractOpacity\` function separates the color and opacity from a given color string. It supports HEXA, RGBA, and HSLA formats. For color formats that do not include an alpha channel, the function defaults the opacity to 1.

## Arguments

- \`color\` (string): The color string from which to extract the color and opacity.

## Returns

- Object: An object containing the extracted color and opacity. The color is returned without the alpha channel, and the opacity is a number between 0 and 1.

## Usage Examples

### Extracting from HEXA

\`\`\`typescript
const result = extractOpacity('#FF573380');
console.log(result); // { color: '#FF5733', opacity: 0.5 }
\`\`\`

### Extracting from RGBA

\`\`\`typescript
const result = extractOpacity('rgba(255, 87, 51, 0.5)');
console.log(result); // { color: 'rgb(255, 87, 51)', opacity: 0.5 }
\`\`\`

### Default Opacity for HEX

\`\`\`typescript
const result = extractOpacity('#FF5733');
console.log(result); // { color: '#FF5733', opacity: 1 }
\`\`\`
`;

export { content };
