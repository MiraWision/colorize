const content = `
The \`changeOpacity\` function modifies the opacity of a given color. It allows you to adjust the alpha value of a color, effectively changing its transparency. This function is useful for creating semi-transparent colors for overlays, shadows, or any graphical elements requiring translucency.

## Arguments

- \`color\` (string): The color whose opacity is to be adjusted, provided in a valid color format.
- \`opacity\` (number): The new opacity value, a number between 0 (completely transparent) and 1 (completely opaque).

## Returns

- (string): The color with adjusted opacity, returned in the same format as the input color.

## Usage Examples

### Changing Opacity

\`\`\`typescript
const color = "rgb(255, 0, 0)"; // A solid red color
const opacity = 0.5; // Set opacity to 50%

const translucentColor = changeOpacity(color, opacity);
console.log(translucentColor);
// Output: "rgba(255, 0, 0, 0.5)" - a semi-transparent red
\`\`\`

### Handling Invalid Color Formats

The function handles invalid color formats gracefully by using white as a fallback.

\`\`\`typescript
const color = "invalidColor";
const opacity = 0.5;
  
const translucentColor = changeOpacity(color, opacity);
console.log(translucentColor); // Uses white as fallback and adjusts its opacity
\`\`\`
`;

export { content };
