const { convertColor, ColorFormat } = require('@mirawision/colorize');

describe('convertColor', () => {
  it('should correctly convert HEX to RGBA', () => {
    const result = convertColor('#FFFFFF', ColorFormat.RGBA);
    expect(result).toBe('rgba(255, 255, 255, 1)');
  });

  it('should correctly convert RGBA to HEX', () => {
    const result = convertColor('rgba(255, 255, 255, 1)', ColorFormat.HEX);
    expect(result).toBe('#FFFFFF');
  });

  it('should correctly convert HEX to RGB', () => {
    const result = convertColor('#ff0000', ColorFormat.RGB);
    expect(result).toBe('rgb(255, 0, 0)');
  });

  it('should correctly convert HSL to RGBA', () => {
    const result = convertColor('hsl(120, 100%, 50%)', ColorFormat.RGBA);
    expect(result).toBe('rgba(0, 255, 0, 1)');
  });

  it('should correctly convert CMYK to RGBA', () => {
    const result = convertColor('cmyk(0%, 0%, 0%, 0%)', ColorFormat.RGBA);
    expect(result).toBe('rgba(255, 255, 255, 1)');
  });

  it('should correctly convert RGBA to HSLA', () => {
    const result = convertColor('rgba(255, 0, 0, 1)', ColorFormat.HSLA);
    expect(result).toBe('hsla(0, 100%, 50%, 1)');
  });

  it('should correctly convert RGBA to CMYK', () => {
    const result = convertColor('rgba(0, 0, 0, 1)', ColorFormat.CMYK);
    expect(result).toBe('cmyk(0%, 0%, 0%, 100%)');
  });

  it('should correctly convert HSLA to RGB', () => {
    const result = convertColor('hsla(240, 100%, 50%, 1)', ColorFormat.RGB);
    expect(result).toBe('rgb(0, 0, 255)');
  });

  it('should correctly convert HSV to RGB', () => {
    const result = convertColor('hsv(120, 100%, 100%)', ColorFormat.RGB);
    expect(result).toBe('rgb(0, 255, 0)');
  });

  it('should correctly convert RGB to HEXA', () => {
    const result = convertColor('rgb(255, 0, 0)', ColorFormat.HEXA);
    expect(result).toBe('#FF0000FF');
  });

  it('should correctly convert HEXA to HSL', () => {
    const result = convertColor('#ff00ff80', ColorFormat.HSL);
    expect(result).toBe('hsl(300, 100%, 50%)');
  });

  it('should correctly convert CMYK to HEX', () => {
    const result = convertColor('cmyk(0%, 100%, 0%, 0%)', ColorFormat.HEX);
    expect(result).toBe('#FF00FF');
  });

  it('should return the same color when converting to the same format', () => {
    const color = '#FFFFFF';
    const result = convertColor(color, ColorFormat.HEX);
    expect(result).toBe(color);
  });
  
  it('should throw an error for invalid color format', () => {
    expect(() => {
      convertColor('invalid color', ColorFormat.HEX);
    }).toThrow('Invalid color format');
  });
});
