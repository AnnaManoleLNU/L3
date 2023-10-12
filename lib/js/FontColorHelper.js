/**
 * The FontColorHelper class tells us whether a font color is WCAG compliant or not, given a background color. It also suggests a either white or black font color, given a background color.
 */
export class FontColorHelper {
  // Formulas for calculating the contrast between two colors can be found here: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-procedure

  #calculateLuminance(color) {
    color = color.slice(4, -1);

    const rgbComponents = color.split(",");

    for (let i = 0; i < rgbComponents.length; i++) {
      rgbComponents[i] = parseInt(rgbComponents[i].trim());
    }

    const rgbComponentsArray = [];
    for (let i = 0; i < 3; i++) {
      rgbComponentsArray[i] = rgbComponents[i];
    }

    for (let i = 0; i < rgbComponentsArray.length; i++) {
      rgbComponentsArray[i] /= 255;
      if (rgbComponentsArray[i] <= 0.03928) {
        rgbComponentsArray[i] /= 12.92;
      } else {
        rgbComponentsArray[i] = Math.pow(
          (rgbComponentsArray[i] + 0.055) / 1.055,
          2.4
        );
      }
    }

    let luminance =
      0.2126 * rgbComponentsArray[0] +
      0.7152 * rgbComponentsArray[1] +
      0.0722 * rgbComponentsArray[2];

    return luminance;
  }

  #calculateContrastRatio(color1, color2) {
    const luminance1 = this.#calculateLuminance(color1);
    const luminance2 = this.#calculateLuminance(color2);

    let darkColor;
    let lightColor;

    if (luminance1 > luminance2) {
      darkColor = luminance1;
      lightColor = luminance2;
    } else {
      darkColor = luminance2;
      lightColor = luminance1;
    }

    const contrastRatio = (darkColor + 0.05) / (lightColor + 0.05);
    return contrastRatio;
  }
  
  /**
   * The method checks if the contrast ratio between two colors is WCAG AA compliant. The contrast ratio must be at least 4.5:1 for normal text.
   *
   * @param {String} color1 - can either be the background color or the font color, in rgb string format.
   * @param {String} color2 - can either be the background color or the font color, in rgb string format.
   * @returns {Boolean} - true if the contrast ratio is at least 4.5, false if it's not.
   */
  checkIfCompliantWithWCAGAA(color1, color2) {
    const contrastRatio = this.#calculateContrastRatio(color1, color2);
    if (contrastRatio < 4.5) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * The method checks if the contrast ratio between two colors is WCAG AAA compliant. The contrasts ratio must be at least 7:1 for normal text.
   *
   * @param {String} color1 - can either be the background color or the font color, in rgb string format.
   * @param {String} color2 - can either be the background color or the font color, in rgb string format.
   * @returns {Boolean} - true if the contrast ratio is at least 7, false if it's not.
   */
  checkIfCompliantWithWCAGAAA(color1, color2) {
    const contrastRatio = this.#calculateContrastRatio(color1, color2);
    if (contrastRatio < 7) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * The method suggests a font color, either white or black, given a background color.
   *
   * @param {String} backgroundColor - the background color in rgb string format.
   * @returns {String} fontColor - either "rgb(255, 255, 255)" or "rgb(0, 0, 0)";
   */
  suggestWhiteOrBlackFont(backgroundColor) {
    const white = "rgb(255, 255, 255)";
    const black = "rgb(0, 0, 0)";

    const contrastRatioWhite = this.#calculateContrastRatio(
      backgroundColor,
      white
    );
    const contrastRatioBlack = this.#calculateContrastRatio(
      backgroundColor,
      black
    );

    if (contrastRatioWhite > contrastRatioBlack) {
      return white;
    } else {
      return black;
    }
  }
}
