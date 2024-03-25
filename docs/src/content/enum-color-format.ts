const content = `
The \`ColorFormat\` enum is used to define the various color formats supported by the system. It helps in standardizing the color format representations throughout the application.

## Enum Values

- \`HEX\` ("hex"): Represents the HEX color format (e.g., "#FFFFFF").
- \`HEXA\` ("hexa"): Represents the HEXA color format which includes an alpha channel (e.g., "#FFFFFF00").
- \`RGB\` ("rgb"): Represents the RGB color format (e.g., "rgb(255, 255, 255)").
- \`RGBA\` ("rgba"): Represents the RGBA color format which includes an alpha channel (e.g., "rgba(255, 255, 255, 1.0)").
- \`HSL\` ("hsl"): Represents the HSL color format (e.g., "hsl(0, 100%, 50%)").
- \`HSLA\` ("hsla"): Represents the HSLA color format which includes an alpha channel (e.g., "hsla(0, 100%, 50%, 1.0)").
- \`CMYK\` ("cmyk"): Represents the CMYK color format (e.g., "cmyk(0%, 0%, 0%, 0%)").
- \`HSV\` ("hsv"): Represents the HSV color format (e.g., "hsv(0, 100%, 100%)").

## Usage Example

The \`ColorFormat\` enum can be used to specify the expected color format in various functions and components throughout the application. For example, when converting colors from one format to another, the target format can be specified using this enum.

\`\`\`typescript
const targetFormat = ColorFormat.RGBA;
const convertedColor = convertColor("#FFFFFF", targetFormat);
console.log(convertedColor); // Output: "rgba(255, 255, 255, 1.0)"
\`\`\`
`;

export { content };
