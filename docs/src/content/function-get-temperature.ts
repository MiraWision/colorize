export const content = `
The \`getTemperature\` function converts a color string into an estimated correlated color temperature (CCT) value expressed in Kelvin. The result is clamped to the range 1000K–10000K, which covers most practical lighting conditions from candlelight to blue daylight.

## Arguments

- \`color\` (string): The color in any supported format (HEX, RGB, RGBA, HSL, HSLA, HSV, CMYK).

## Returns

- (number): Estimated color temperature in Kelvin (integer or float). Always in the range 1000 ≤ CCT ≤ 10000.

## Usage Examples

### Getting temperature for warm colors

\`\`\`typescript
const temperature = getTemperature("#FF4500");
console.log(temperature); // ~2000K (warm orange, firelight)

const temperature2 = getTemperature("rgb(255, 215, 0)");
console.log(temperature2); // ~3000K (warm white, incandescent)
\`\`\`

### Getting temperature for neutral colors

\`\`\`typescript
const temperature = getTemperature("hsl(0, 0%, 100%)");
console.log(temperature); // ~5500K (neutral daylight)
\`\`\`

### Getting temperature for cool colors

\`\`\`typescript
const temperature = getTemperature("#ADD8E6");
console.log(temperature); // ~9000K (blue sky light)
\`\`\`

### Error Handling

The function handles invalid color formats gracefully by using white as a fallback.

\`\`\`typescript
const temperature = getTemperature("invalidColor");
console.log(temperature); // ~5500K (default to neutral daylight)
\`\`\`

## Temperature Ranges

- **1000K-2000K**: Candlelight, sunset
- **2000K-3000K**: Warm white, incandescent bulbs
- **3000K-4000K**: Warm fluorescent
- **4000K-5000K**: Cool white, fluorescent
- **5000K-6500K**: Daylight, neutral white
- **6500K-8000K**: Cool daylight
- **8000K-10000K**: Blue sky, overcast daylight
`;
