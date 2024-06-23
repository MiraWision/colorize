# @mirawision/colorize

A comprehensive color manipulation library for TypeScript, `@mirawision/colorize` offers a wide range of functionalities for working with colors. Easily convert between color formats, validate color strings, generate color gradients, blend colors, and perform various adjustments like brightness, saturation, inversion, and more.

[Demo and advanced Documentation can be found here!](https://mirawision.github.io/colorize)

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
- **Hue Adjustment**: Change the hue of a color to any specified degree, enabling creative color transformations.
- **Opacity Change**: Adjust the opacity of a color, useful for transparency effects and layering.
- **Color Inversion**: Invert colors to create striking visual effects or highlight contrasts.
- **Tinting and Shading**: Create tints by mixing colors with white and shades by mixing with black, ideal for theme generation and UI design.
- **Sepia Effect**: Apply a sepia tone to give colors a warm, vintage feel.
- **Greyscale Application**: Apply greyscale, maintaining luminance while removing hue and saturation.
- **Opposite Color**: Calculate the complementary color by adjusting the hue by 180 degrees, useful for design contrast and harmony.
- **Random Color Generation**: Generate a random color in any specified format (HEX, HEXA, RGB, RGBA, HSL, HSLA, HSV, CMYK).

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

```bash
npm install @mirawision/colorize
```

or 

```bash
yarn add @mirawision/colorize
```

## Usage

Here's a quick overview of how to use some of the core functionalities of @mirawision/colorize:

### Basic Example with the Color Class

```javascript
import { Color } from '@mirawision/colorize';

// Initialize a Color object with a HEX color
const myColor = new Color('#3498db');

console.log(myColor.get()); // Outputs: '#3498db'
console.log(myColor.rgb()); // Returns color in RGB format: 'rgb(52, 152, 219)'
console.log(myColor.hsl()); // Returns color in HSL format: 'hsl(204, 70%, 53%)'

// Apply some manipulations
console.log(myColor.applyBrightness(20)); // Brightens the color: '#60aef1'
console.log(myColor.applyInvert()); // Inverts the color: '#cb6734'
console.log(myColor.applyGrayscale()); // Applies grayscale effect: '#a1a1a1'
```

### Convert Colors

```javascript
import { convertColor } from '@mirawision/colorize/convert-color';

const rgb = convertColor('hsl(120, 100%, 50%)', 'rgb');
console.log(rgb); // Output: 'rgb(0, 255, 0)'
```

### Validate HEX Color

```javascript
import { isValidHEXColor } from '@mirawision/colorize/is-valid-color';

const isValid = isValidHEXColor('#ff0000');
console.log(isValid); // Output: true
```

### Get Color Format

```javascript
import { getColorFormat } from '@mirawision/colorize/get-color-format';

const format = getColorFormat('rgba(255, 0, 0, 0.5)');
console.log(format); // Output: 'rgba'
```

### Generate Random Color

```javascript
import { randomColor } from '@mirawision/colorize';

console.log(randomColor()); // Outputs: a random color in HEX format
console.log(randomColor('rgb')); // Outputs: a random color in RGB format
console.log(randomColor('hsl')); // Outputs: a random color in HSL format
```

### Generate Gradient

```javascript
import { generateSteppedGradient } from '@mirawision/colorize/generate-stepped-gradient';

const gradient = generateSteppedGradient('rgb(255, 0, 0)', 'rgb(0, 0, 255)', 3);
console.log(gradient); // Output: ['rgb(191, 0, 64)', 'rgb(128, 0, 128)', 'rgb(64, 0, 191)']
```

### Adjust Brightness

```javascript
import { adjustBrightness } from '@mirawision/colorize/adjust-brightness';

const brighter = adjustBrightness('hsl(120, 50%, 50%)', 10);
console.log(brighter); // Output: 'hsl(120, 50%, 60%)'
```

## Contributing

Contributions are always welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.
