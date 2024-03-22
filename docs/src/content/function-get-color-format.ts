import { Routes } from '../routes';

const content = `
The \`getColorFormat\` function is designed to identify the format of a given color string. It supports various color formats, including HEX, HEXA, RGB, RGBA, HSL, HSLA, HSV, and CMYK. The function utilizes a series of validators to determine the color format by testing the input color against known format patterns.

## Arguments

- \`color\` (string): The color string whose format needs to be identified.

## Returns

- ([ColorFormat](${Routes.EnumColorFormat}) | null): The function returns the identified color format as a \`ColorFormat\` enumeration value. If the color format is not recognized, the function returns \`null\`.

## Usage Examples

### Identifying HEX Color Format

\`\`\`typescript
const color = "#FF5733";
const format = getColorFormat(color);
console.log(format); // Output: "hex"
\`\`\`

### Identifying RGB Color Format

\`\`\`typescript
const color = "rgb(255, 87, 51)";
const format = getColorFormat(color);
console.log(format); // Output: "rgb"
\`\`\`

### Handling an Unrecognized Color Format

\`\`\`typescript
const color = "unknown(255, 87, 51)";
const format = getColorFormat(color);
console.log(format); // Output: null
\`\`\`
`

export { content };
