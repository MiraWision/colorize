const content = `
A comprehensive color manipulation library for TypeScript, \`@mirawision/colorize\` offers a wide range of functionalities for working with colors. Easily convert between color formats, validate color strings, generate color gradients, blend colors, and perform various adjustments like brightness, saturation, inversion, and more.

## Features

### Validation & Detection
- **Color Validation**: Check if color strings are valid for different formats, ensuring color data integrity.
- **Format Detection**: Identify the format of a given color string, providing insights into color data and enhancing format compatibility.

### Conversion
- **Color Conversion**: Convert colors between different formats, supporting a wide range of color models.
- **Opacity Extraction**: Extract the opacity value from a color, useful for understanding and manipulating alpha channels.
- **Color Number Parsing**: Parse color components into numeric values, allowing for detailed color manipulations and analyses.

### Gradient Generations
- **Stepped Gradient**: Create stepped gradients between two colors, perfect for heatmaps and visual effects.
- **Advanced Multi-Stepped Gradient**: Generate complex gradients with multiple colors and steps, offering detailed control over color transitions.

### Manipulations
- **Brightness Adjustment**: Increase or decrease the brightness of a color to fit your design needs.
- **Saturation Adjustment**: Modify the saturation of a color, allowing for more vibrant or subdued variations.
- **Opacity Change**: Adjust the opacity of a color, useful for transparency effects and layering.
- **Color Inversion**: Invert colors to create striking visual effects or highlight contrasts.
- **Tinting and Shading**: Create tints by mixing colors with white and shades by mixing with black, ideal for theme generation and UI design.
- **Color Blending**: Blend two colors together with a specified weight for nuanced color mixing.
- **Sepia Effect**: Apply a sepia tone to give colors a warm, vintage feel.
- **Greyscale Application**: Apply greyscale, maintaining luminance while removing hue and saturation.

### Analysis
- **Luminance Calculation**: Get the luminance of a color, understanding its perceived brightness.
- **Color Lightness Detection**: Determine if a color is considered light or dark, aiding in accessibility and readability decisions.
- **Contrast Calculation**: Calculate the contrast ratio between two colors, essential for designing accessible and legible interfaces.

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
