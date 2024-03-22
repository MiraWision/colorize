# @mirawision/colorize

A comprehensive color manipulation library for TypeScript, `@mirawision/colorize` offers a wide range of functionalities for working with colors. Easily convert between color formats, validate color strings, generate color gradients, blend colors, and perform various adjustments like brightness, saturation, inversion, and more.

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

```bash
npm install @mirawision/colorize
```

or 

```bash
yarn add @mirawision/colorize
```

## Usage

Here's a quick overview of how to use some of the core functionalities of @mirawision/colorize:

### Convert Colors

```javascript
import { convertColor } from '@mirawision/colorize';

const rgb = convertColor('hsl(120, 100%, 50%)', 'rgb');
console.log(rgb); // Output: 'rgb(0, 255, 0)'
```

### Validate HEX Color

```javascript
import { isValidHEXColor } from '@mirawision/colorize';

const isValid = isValidHEXColor('#ff0000');
console.log(isValid); // Output: true
```

### Get Color Format

```javascript
import { getColorFormat } from '@mirawision/colorize';

const format = getColorFormat('rgba(255, 0, 0, 0.5)');
console.log(format); // Output: 'RGBA'
```

### Generate Gradient

```javascript
import { generateSteppedGradient } from '@mirawision/colorize';

const gradient = generateSteppedGradient('rgb(255, 0, 0)', 'rgb(0, 0, 255)', 3);
console.log(gradient); // Output: ['rgb(191, 0, 64)', 'rgb(128, 0, 128)', 'rgb(64, 0, 191)']
```

### Adjust Brightness

```javascript
import { adjustBrightness } from '@mirawision/colorize';

const brighter = adjustBrightness('hsl(120, 50%, 50%)', 10);
console.log(brighter); // Output: 'hsl(120, 50%, 60%)'
```

## Contributing

Contributions are always welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.
