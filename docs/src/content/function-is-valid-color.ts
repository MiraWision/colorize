const content = `
The \`isValidColor\` function checks if a given string is a valid color in any of the supported color formats. It utilizes a series of validator functions to determine the validity of the color across different color formats. These validator subfunctions can also be used independently to check specific color formats.

## Arguments

- \`color\` (string): The color string to be validated.

## Returns

- (boolean): Returns \`true\` if the color is valid in any of the recognized formats, otherwise returns \`false\`.

## Usage Examples

### Validating a HEX Color

\`\`\`typescript
const color = "#FF5733";
const isValid = isValidColor(color);
console.log(isValid); // Output: true
\`\`\`

### Validating an Invalid Color

\`\`\`typescript
const color = "invalidColor";
const isValid = isValidColor(color);
console.log(isValid); // Output: false
\`\`\`

## Validator Subfunctions

The \`isValidColor\` function relies on a series of subfunctions to validate different color formats:

- \`isValidHEXColor\`
- \`isValidHEXAColor\`
- \`isValidRGBColor\`
- \`isValidRGBAColor\`
- \`isValidHSLColor\`
- \`isValidHSLAColor\`
- \`isValidHSVColor\`
- \`isValidCMYKColor\`

Each subfunction follows a similar approach and can be used independently to validate a specific color format.

### General Approach for Validator Subfunctions

Each validator subfunction, such as \`isValidHEXColor\`, checks if the input string conforms to the pattern expected for its specific color format. For instance, \`isValidHEXColor\` uses a regular expression to verify if the input string is a valid HEX color code.

\`\`\`typescript
const isValidHEXColor = (color: string): boolean => {
  const regex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
  return regex.test(color);
};
\`\`\`

These validators return \`true\` if the input string matches the expected pattern for the color format, otherwise, they return \`false\`. They can be utilized individually to check the validity of a color string against a specific color format.

\`\`\`typescript
const hexColor = "#FF5733";
console.log(isValidHEXColor(hexColor)); // Output: true

const rgbColor = "rgb(255, 87, 51)";
console.log(isValidRGBColor(rgbColor)); // Output: false (since it's checking against HEX format)
\`\`\`
`;

export { content };
