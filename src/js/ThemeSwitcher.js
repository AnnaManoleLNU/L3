export class ThemeSwitcher {
  #currentTheme = 'dark';
  #isSwitching = false;
  #switchDelay = 100; // 100ms delay

  constructor() {}

  initiateThemeSwitcher() {
    const themeSwitcher = document.querySelector('.theme-switcher');
    themeSwitcher.addEventListener('click', () => {
      if (!this.#isSwitching) {
        this.#isSwitching = true;
        this.#switchTheme();
        setTimeout(() => this.#isSwitching = false, this.#switchDelay);
      }
    });
  }

  #switchTheme() {
    if (this.#currentTheme === 'dark') {
      this.#setLightTheme();
    } else {
      this.#setDarkTheme();
    }
  }

  #setLightTheme() {
    this.#currentTheme = 'light';
    console.log(this.#currentTheme);
  }

  #setDarkTheme() {
    this.#currentTheme = 'dark';
    console.log(this.#currentTheme);
  }

}
