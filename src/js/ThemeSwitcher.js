export class ThemeSwitcher {
  #currentTheme = 'dark'

  constructor() {
  }

  initiateThemeSwitcher() {
    const themeSwitcher = document.querySelector('.theme-switcher');
    themeSwitcher.addEventListener('click', () => {
      if (this.#currentTheme === 'dark') {
        this.#setLightTheme();
      } else {
        this.#setDarkTheme();
      }
    });
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