const content = `
A comprehensive color manipulation library for TypeScript, \`@mirawision/colorize\` offers a wide range of functionalities for working with colors. Easily convert between color formats, validate color strings, generate color gradients, blend colors, and perform various adjustments like brightness, saturation, inversion, and more.

## Features

- **Color Conversion**: Convert colors between different formats.
- **Color Validation**: Check if color strings are valid for different formats.
- **Format Detection**: Identify the format of a given color string.
- **Gradient Generation**: Create stepped gradients between two colors.
- **Color Blending**: Blend two colors together with a specified weight.
- **Brightness Adjustment**: Increase or decrease the brightness of a color.
- **Saturation Adjustment**: Modify the saturation of a color.
- **Color Inversion**: Invert colors for striking visual effects.
- **Sepia Effect**: Apply a sepia tone to your colors.
- **Opacity Change**: Adjust the opacity of a color.

### Supported Color Formats:

- RGB, RGBA
- HSL, HSLA
- HEX, HEXA
- HSV
- CMYK

## Installation

\`\`\`bash
npm install @mirawision/colorize
\`\`\`

or 

\`\`\`bash
yarn add @mirawision/colorize
\`\`\`

## Usage Example

Here's a quick overview of how to use some of the core functionalities of \`@mirawision/colorize\`:

### Convert Colors

\`\`\`typescript
import { convertColor } from '@mirawision/colorize';

const rgb = convertColor('hsl(120, 100%, 50%)', 'rgb');
console.log(rgb); // Output: 'rgb(0, 255, 0)'
\`\`\`

### Validate HEX Color

\`\`\`typescript
import { isValidHEXColor } from '@mirawision/colorize';

const isValid = isValidHEXColor('#ff0000');
console.log(isValid); // Output: true
\`\`\`
`

export { content };
