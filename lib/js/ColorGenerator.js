/**
 * Generates either a random, light or dark color.
 */
export class ColorGenerator {
  // The color is an array of 3 numbers (representing RGB) between 0 and 255.
  #color;
  #min = 0;
  #max = 0;

  constructor() {
    this.#color = [0, 0, 0];
  }

  #generateColor() {
    this.#color = [
      Math.floor(Math.random() * (this.#max - this.#min + 1)) + this.#min,
      Math.floor(Math.random() * (this.#max - this.#min + 1)) + this.#min,
      Math.floor(Math.random() * (this.#max - this.#min + 1)) + this.#min,
    ];
  }

  /**
   * The method generates a random rbg color in string format.
   *
   * @returns {string} color - a random rgb color in string format.
   */
  generateRandomColor() {
    this.#min = 0;
    this.#max = 255;
    this.#generateColor();
    this.#color = this.#makeColorArrayIntoString(this.#color);
    return this.#color;
  }

  /**
   * The method generates a light rbg color in string format. The values are randomized, between 155 and 255 rgb.
   *
   * @returns {string} color - a light rgb color in string format.
   */
  generateLightColor() {
    this.#min = 155;
    this.#max = 255;
    this.#generateColor();
    this.#addToColorIfNotLightEnough();
    this.#color = this.#makeColorArrayIntoString(this.#color);
    return this.#color;
  }

  #isColorLightEnough() {
    if (this.#color[0] < 200 && this.#color[1] < 200 && this.#color[2] < 200) {
      return false;
    } else {
      return true;
    }
  }

  #addToColorIfNotLightEnough() {
    if (!this.#isColorLightEnough()) {
      for (let i = 0; i < this.#color.length; i++) {
        this.#color[i] = this.#color[i] + 10;
      }
    }
  }

  /**
   * The method generates a dark rbg color in string format. The values are randomized between 0 and 100 rbg.
   *
   * @returns {string} color - a dark rgb color in string format.
   */
  generateDarkColor() {
    this.#min = 0;
    this.#max = 100;
    this.#generateColor();
    this.#substractFromColorIfNotDarkEnough();
    this.#color = this.#makeColorArrayIntoString(this.#color);
    return this.#color;
  }

  #isColorDarkEnough() {
    if (this.#color[0] > 50 && this.#color[1] > 50 && this.#color[2] > 50) {
      return false;
    } else {
      return true;
    }
  }

  #substractFromColorIfNotDarkEnough() {
    if (!this.#isColorDarkEnough()) {
      for (let i = 0; i < this.#color.length; i++) {
        this.#color[i] = this.#color[i] - 10;
      }
    }
  }

  #makeColorArrayIntoString(array) {
    const colorString = "rgb(" + array.join(", ") + ")";
    return colorString;
  }
}
