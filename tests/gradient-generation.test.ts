import { generateSteppedGradient } from '../src/generate-stepped-gradient';
import { generateMultiSteppedGradient } from '../src/generate-multi-stepped-gradient';

describe('gradient-generation', () => {
  describe('generateSteppedGradient', () => {
    it('should generate a stepped gradient with valid colors', () => {
      const gradient = generateSteppedGradient('rgb(255, 0, 0)', 'rgb(0, 0, 255)', 3);
      expect(gradient.length).toBe(3);
      expect(gradient.join(';')).toBe(['rgb(191, 0, 64)', 'rgb(128, 0, 128)', 'rgb(64, 0, 191)'].join(';'));
    });

    it('should throw an error for invalid color formats', () => {
      expect(() => {
        generateSteppedGradient('not a color', 'rgb(0, 0, 255)', 3);
      }).toThrow('Invalid color format');

      expect(() => {
        generateSteppedGradient('rgb(255, 0, 0)', 'not a color', 3);
      }).toThrow('Invalid color format');
    });
  });

  describe('generateMultiSteppedGradient', () => {
    it('generates a complex gradient with given colors and steps', () => {
      const gradient = generateMultiSteppedGradient("#ff0000", 3, "#ffff00", 2, "#00ff00");
      expect(gradient.length).toBe(8);
      expect(gradient).toEqual(expect.arrayContaining(["#ff0000", "#ffff00", "#00ff00"]));
    });
  
    it('throws an error if the number of arguments is incorrect', () => {
      expect(() => {
        generateMultiSteppedGradient("#ff0000");
      }).toThrow();
  
      expect(() => {
        generateMultiSteppedGradient("#ff0000", 3);
      }).toThrow();
    });
  
    it('throws an error if colors and steps are not in the correct format', () => {
      expect(() => {
        generateMultiSteppedGradient("#ff0000", "#00ff00", 3);
      }).toThrow();
  
      expect(() => {
        generateMultiSteppedGradient(3, "#ff0000", "#00ff00");
      }).toThrow();
    });
  
    it('includes all specified colors in the output', () => {
      const gradient = generateMultiSteppedGradient("#ff0000", 1, "#00ff00", 1, "#0000ff");
      expect(gradient).toContain("#ff0000");
      expect(gradient).toContain("#00ff00");
      expect(gradient).toContain("#0000ff");
    });
  });
});

