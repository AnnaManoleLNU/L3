export class ThemeSwitcher {
  #currentTheme = "dark";
  #isThemeSwitching = false;

  constructor() {
    this.#initiateThemeSwitcher();
  }
  
  getCurrentTheme() {
    return this.#currentTheme;
  }

  #initiateThemeSwitcher() {
    const themeSwitcher = document.querySelector(".theme-switcher");
    themeSwitcher.addEventListener("click", () => {
      if (!this.#isThemeSwitching) {
        this.#isThemeSwitching = true;
        this.#switchTheme();
        setTimeout(() => (this.#isThemeSwitching = false), 100);
      }
    });
  }

  #switchTheme() {
    if (this.#currentTheme === "dark") {
      this.#applyLightTheme();
    } else {
      this.#applyDarkTheme();
    }
  }

  #applyLightTheme() {
    this.#currentTheme = "light";
    this.#setThemeProperties("#212529", "whitesmoke");
  }

  #applyDarkTheme() {
    this.#currentTheme = "dark";
    this.#setThemeProperties("whitesmoke", "#212529");
  }

  #setThemeProperties(light, dark) {
    document.documentElement.style.setProperty("--light", light);
    document.documentElement.style.setProperty("--dark", dark);
  }

}
