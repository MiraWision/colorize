interface HSL {
  h: number;
  s: number;
  l: number;
}

enum HarmonyType {
  Complementary = 'complementary',
  Analogous = 'analogous',
  Triadic = 'triadic',
  Tetradic = 'tetradic',
  Monochromatic = 'monochromatic',
  SplitComplementary = 'splitComplementary',
  NeutralColors = 'neutralColors',
  Random = 'random',
}

class ColorHarmonies {
  private static adjustHue(hue: number): number {
    return (hue + 360) % 360;
  }

  private static harmonyStrategies = {
    [HarmonyType.Monochromatic]: (color: HSL) => this.monochromatic(color, 5),
    [HarmonyType.Complementary]: (color: HSL) => this.complementary(color, 10),
    [HarmonyType.Analogous]: (color: HSL) => this.analogous(color, 30, 2),
    [HarmonyType.Triadic]: (color: HSL) => this.triadic(color),
    [HarmonyType.Tetradic]: (color: HSL) => this.tetradic(color),
    [HarmonyType.SplitComplementary]: (color: HSL) => this.splitComplementary(color, 30),
    [HarmonyType.NeutralColors]: (color: HSL) => this.neutralColors(color, 4),
    [HarmonyType.Random]: (color: HSL) => this.randomHarmony(color),
  };

  private static correctHSL({ h, s, l }: HSL): HSL {
    return {
      h: this.adjustHue(h),
      s: Math.max(0, Math.min(s, 100)),
      l: Math.max(0, Math.min(l, 100)),
    };
  }

  private static uniqueHSL(palette: HSL[]): HSL[] {
    const uniqueSet = new Set<string>();
    palette.forEach(color => {
      const colorStr = JSON.stringify(this.correctHSL(color));
      uniqueSet.add(colorStr);
    });
    return Array.from(uniqueSet).map(colorStr => JSON.parse(colorStr));
  }

  private static complementary(color: HSL, variation: number = 10): HSL[] {
    let palette: HSL[] = [];
    const complementaryHue = this.adjustHue(color.h + 180);
  
    palette.push(
      this.correctHSL({ h: color.h, s: color.s, l: color.l }),
      this.correctHSL({ h: complementaryHue, s: color.s, l: color.l })
    );
  
    for (let i = 1; i <= variation; i++) {
      const saturationDecrease = Math.max(0, color.s - i * 5);
      const saturationIncrease = Math.min(100, color.s + i * 5);
      const lightnessDecrease = Math.max(0, color.l - i * 5);
      const lightnessIncrease = Math.min(100, color.l + i * 5);
  
      palette.push(
        { h: color.h, s: saturationDecrease, l: lightnessIncrease },
        { h: color.h, s: saturationIncrease, l: lightnessDecrease }
      );
  
      palette.push(
        { h: complementaryHue, s: saturationDecrease, l: lightnessIncrease },
        { h: complementaryHue, s: saturationIncrease, l: lightnessDecrease }
      );
    }
  
    return this.uniqueHSL(palette);
  }  

  public static analogous(color: HSL, spread: number = 30, variations: number = 2): HSL[] {
    let palette: HSL[] = [];
    for (let i = -variations; i <= variations; i++) {
      const baseHue = this.adjustHue(color.h + i * spread);
      palette.push(this.correctHSL({ h: baseHue, s: color.s, l: color.l }));
     
      for (let j = 1; j <= variations; j++) {
        palette.push(
          this.correctHSL({ h: baseHue, s: Math.max(0, color.s - j * 10), l: Math.min(100, color.l + j * 10) }),
          this.correctHSL({ h: baseHue, s: Math.min(100, color.s + j * 10), l: Math.max(0, color.l - j * 10) })
        );
      }
    }
    return this.uniqueHSL(palette);
  }

  public static triadic(color: HSL): HSL[] {
    let palette: HSL[] = [];
    const hues = [0, 120, 240];
    hues.forEach((offset) => {
      const hue = this.adjustHue(color.h + offset);
      palette.push(this.correctHSL({ h: hue, s: color.s, l: color.l }));
    
      for (let i = 1; i <= 2; i++) { 
        palette.push(
          this.correctHSL({ h: hue, s: Math.max(0, color.s - i * 10), l: Math.min(100, color.l + i * 10) }),
          this.correctHSL({ h: hue, s: Math.min(100, color.s + i * 10), l: Math.max(0, color.l - i * 10) })
        );
      }
    });
    return this.uniqueHSL(palette);
  }

  public static tetradic(color: HSL): HSL[] {
    let palette: HSL[] = [];
    const hues = [0, 90, 180, 270];
    hues.forEach((offset) => {
      const hue = this.adjustHue(color.h + offset);
      palette.push(this.correctHSL({ h: hue, s: color.s, l: color.l }));
     
      for (let i = 1; i <= 2; i++) {
        palette.push(
          this.correctHSL({ h: hue, s: Math.max(0, color.s - i * 10), l: Math.min(100, color.l + i * 10) }),
          this.correctHSL({ h: hue, s: Math.min(100, color.s + i * 10), l: Math.max(0, color.l - i * 10) })
        );
      }
    });
    return this.uniqueHSL(palette);
  }

  public static monochromatic(color: HSL, variations: number = 5): HSL[] {
    let palette: HSL[] = [];
    for (let i = 0; i <= variations; i++) {
    
      palette.push(
        this.correctHSL({ h: color.h, s: Math.max(0, color.s - i * 10), l: Math.max(0, Math.min(100, color.l + i * 10)) }),
        this.correctHSL({ h: color.h, s: Math.min(100, color.s + i * 10), l: Math.max(0, Math.min(100, color.l - i * 10)) })
      );
    }
    return this.uniqueHSL(palette.filter(p => p.s != 0 && p.l != 0 && p.l != 100));
  }

  public static splitComplementary(color: HSL, spread: number = 30): HSL[] {
    let palette: HSL[] = [this.correctHSL(color)];
   
    [180 - spread, 180 + spread].forEach(offset => {
      const hue = this.adjustHue(color.h + offset);
      palette.push(this.correctHSL({ h: hue, s: color.s, l: color.l }));
     
      for (let i = 1; i <= 2; i++) {
        palette.push(
          this.correctHSL({ h: hue, s: Math.max(0, color.s - i * 10), l: Math.min(100, color.l + i * 10) }),
          this.correctHSL({ h: hue, s: Math.min(100, color.s + i * 10), l: Math.max(0, color.l - i * 10) })
        );
      }
    });
    return this.uniqueHSL(palette);
  }

  public static neutralColors(color: HSL, variations: number = 4): HSL[] {
    let palette: HSL[] = [];
    for (let i = 1; i <= variations; i++) {
      const adjustedHue = this.adjustHue(color.h + i * 15);
   
      palette.push(this.correctHSL({ h: adjustedHue, s: Math.max(0, color.s - i * 20), l: color.l }));
    }
    return this.uniqueHSL(palette);
  }

  public static randomHarmony(baseColor: HSL): HSL[] {
    const harmonyTypes = [this.complementary, this.analogous, this.triadic, this.tetradic, this.monochromatic, this.splitComplementary, this.neutralColors];
    const randomIndex = Math.floor(Math.random() * harmonyTypes.length);
    return harmonyTypes[randomIndex].call(this, baseColor, 10);
  }

  public static generatePalette(baseColor: HSL, strategy: HarmonyType): HSL[] {
    const strategyFunction = this.harmonyStrategies[strategy];
    if (strategyFunction) {
      return strategyFunction(baseColor);
    }

    return [this.correctHSL(baseColor)];
  }
}

export default ColorHarmonies;