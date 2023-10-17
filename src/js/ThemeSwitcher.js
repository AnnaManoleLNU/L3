export class ThemeSwitcher {
  #currentTheme = 'dark';
  #isSwitching = false;
  #switchDelay = 100; // 100ms delay

  constructor() {
    this.initiateThemeSwitcher(); // TODO: make this private and use it in ColorMemoryGame.js, maybe?
  }

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
    document.documentElement.style.setProperty('--light', '#212529');  
    document.documentElement.style.setProperty('--dark', 'whitesmoke'); 
  }

  #setDarkTheme() {
    this.#currentTheme = 'dark';
    document.documentElement.style.setProperty('--light', 'whitesmoke');
    document.documentElement.style.setProperty('--dark', '#212529');
  }

  getcurrentTheme() {
    return this.#currentTheme;
  }

}
