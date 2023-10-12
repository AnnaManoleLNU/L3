/**
 * The ColorSchemeGenerator class generates a color scheme from a given color.
 */
export class ColorSchemeGenerator {
  // The color scheme is an array of 2 colors in string format, generated from the given color.
  #colorScheme;

  constructor() {
    this.#colorScheme = [];
  }

  /**
   * The method generates 2 colors that are monochromatic to the given color.
   *
   * @param {string} color - the rgb color to generate the monochromatic color scheme from, in string format.
   * @returns {Array} colorScheme - an array of 2 rbg colors in string format, in monochromatic color scheme.
   */
  generateMonochromaticColorScheme(color) {
    this.#throwErrorIfParamIsNotString(color);

    for (let i = 0; i < 2; i++) {
      let newColor;
      if (i === 0) {
        newColor = this.#generateLightColor(color);
      } else if (i === 1) {
        newColor = this.#generateDarkColor(color);
      }
      this.#colorScheme.push(newColor);
    }

    return this.#colorScheme;
  }

  #makeColorStringIntoArrayOfIntegers(colorString) {
    colorString = colorString.split("(")[1].split(")")[0].split(",");

    const rgbValuesArray = [];
    for (let i = 0; i < colorString.length; i++) {
      let rgbValue = parseInt(colorString[i]);
      rgbValuesArray.push(rgbValue);
    }
    return rgbValuesArray;
  }

  #generateLightColor(color) {
    const rgbValuesArray = this.#makeColorStringIntoArrayOfIntegers(color);

    // Random lighten, while keeping it the same color.
    const lightenFactor = Math.random() * 0.5 + 0.5;

    // Lighten the color components, ensuring they stay within [0, 255]
    const lightenedColor = [];
    for (let i = 0; i < rgbValuesArray.length; i++) {
      let lightenedRgbComponent =
        rgbValuesArray[i] + (255 - rgbValuesArray[i]) * lightenFactor;
      lightenedRgbComponent = Math.min(255, Math.max(0, lightenedRgbComponent));
      lightenedColor.push(Math.round(lightenedRgbComponent));
    }

    // Create the lightened color string
    const lightColorString = `rgb(${lightenedColor[0]}, ${lightenedColor[1]}, ${lightenedColor[2]})`;

    return lightColorString;
  }

  #generateDarkColor(color) {
    const rgbValuesArray = this.#makeColorStringIntoArrayOfIntegers(color);

    // Set a random darken factor.
    const darkenFactor = Math.random() * 0.5 - 0.5;

    // Darken the color components, ensuring they stay within [0, 255].
    const darkenedColorArray = [];
    for (let i = 0; i < rgbValuesArray.length; i++) {
      // in a dark color, the rgb values are lower than the original color, so we should subtract the difference between 0 and the original color.
      let darkenedRgbComponent =
        rgbValuesArray[i] - (0 - rgbValuesArray[i]) * darkenFactor;
      // make sure the rgb component is between 0 and 255
      darkenedRgbComponent = Math.min(255, Math.max(0, darkenedRgbComponent));
      darkenedColorArray.push(Math.round(darkenedRgbComponent));
    }
    // turn the array into a string
    const darkColorString = "rgb(" + darkenedColorArray.join(", ") + ")";
    return darkColorString;
  }
  /**
   * The method generates 2 colors that are analogous to the given color.
   *
   * @param {String} color - the rgb color to generate the analogous color scheme from, in string format.
   * @returns {Array} colorScheme - an array of 2 rbg colors in string format, that are analogous to the given color.
   */
  generateAnalogousColorScheme(color) {
    this.#throwErrorIfParamIsNotString(color);
    for (let i = 0; i < 2; i++) {
      let newColor;
      if (i === 0) {
        newColor = this.#generateClockwise(color);
      } else {
        newColor = this.#generateCounterClockwise(color);
      }
      this.#colorScheme.push(newColor);
    }
    return this.#colorScheme;
  }

  #generateClockwise(color) {
    const rgbValuesArray = this.#makeColorStringIntoArrayOfIntegers(color);
    let red = rgbValuesArray[0];
    let green = rgbValuesArray[1];
    let blue = rgbValuesArray[2];

    for (let i = 0; i < rgbValuesArray.length; i++) {
      // Compare all the rgb values to see which one is the highest and perform operations according to forumlas observed on the website: https://www.crispedge.com/generate-analogous-color/

      if (red > green && red > blue) {
        green = green + 20;
      }

      if (green > red && green > blue) {
        blue = blue + 20;
      }

      if (blue > red && blue > green) {
        red = red + 20;
      }
    }

    color = "rgb(" + red + ", " + green + ", " + blue + ")";
    return color;
  }

  #generateCounterClockwise(color) {
    const rgbValuesArray = this.#makeColorStringIntoArrayOfIntegers(color);
    let red = rgbValuesArray[0];
    let green = rgbValuesArray[1];
    let blue = rgbValuesArray[2];

    for (let i = 0; i < rgbValuesArray.length; i++) {
      // Compare all the rgb values to see which one is the highest and perform operations according to forumlas observed on the website: https://www.crispedge.com/generate-analogous-color/
      if (red > green && red > blue) {
        blue = blue + 20;
      }

      // Check if green is the highest, then add to red.
      if (green > red && green > blue) {
        red = red + 20;
      }

      if (blue > red && blue > green) {
        green = green + 20;
      }
    }
    color = "rgb(" + red + ", " + green + ", " + blue + ")";
    return color;
  }

  #throwErrorIfParamIsNotString(color) {
    if (typeof color !== "string" || color.includes("rgb") === false) {
      throw new Error("The parameter must be a string in rgb format.");
    }
  }
}
