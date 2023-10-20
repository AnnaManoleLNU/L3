import { ColorGenerator } from "../../lib/js/ColorGenerator.js";
import { ColorSchemeGenerator } from "../../lib/js/ColorSchemeGenerator.js";

export class ColorMemoryGame {
  #startScreen = document.getElementById("start-screen");
  #difficultyScreen = document.getElementById("difficulty-screen");
  #gameScreen = document.getElementById("game-screen");
  #gameBoard = document.getElementById("game-board");
  #endScreen = document.getElementById("end-screen");
  #originalTiles = [];
  #shuffledTiles = [];
  #userTiles = [];

  constructor(themeSwitcher) {
    this.themeSwitcher = themeSwitcher;
  }

  initiateGame() {
    this.#setUsernameIntoLocalStorage();
    this.#selectDifficulty();
    this.#endGame();
    this.#playAgain();
  }

  #setUsernameIntoLocalStorage() {
    const usernameInput = document.getElementById("username-input");
    const usernameForm = document.getElementById("username-form");
    usernameForm.addEventListener("submit", (event) => {
        try {
        event.preventDefault();
        this.#throwErrorIfUsernameEmpty(usernameInput.value);
        this.#startScreen.classList.add("hidden");
        this.#difficultyScreen.classList.remove("hidden");
        localStorage.setItem("username", usernameInput.value);
        usernameInput.value = "";
      } catch (error) {
        this.#removeWarningIfUsernameNotEmpty();
        this.#createWarningIfUsernameEmpty();
      }
      });
  }

  #throwErrorIfUsernameEmpty(username) {
    if (username === "") {
      throw new Error("Username cannot be empty!");
    }
  }

  #removeWarningIfUsernameNotEmpty() {
    if (document.getElementById("warning")) {
      document.getElementById("warning").remove();
    }
  }

  #createWarningIfUsernameEmpty() {
    const warning = document.createElement("p");
    warning.textContent = "Username cannot be empty!";
    warning.style.color = "crimson";
    warning.id = "warning";
    this.#startScreen.appendChild(warning);
  }

  #selectDifficulty() {
    this.#difficultyScreen.addEventListener("click", (event) => {
      const difficulty = event.target.id;
      if (difficulty === "easy") {
        this.#setupDifficultyWithNumberOfTiles(3);
      }
      if (difficulty === "medium") {
        this.#setupDifficultyWithNumberOfTiles(4);
      }
      if (difficulty === "hard") {
        this.#setupDifficultyWithNumberOfTiles(5);
      }
    });
  }

  #setupDifficultyWithNumberOfTiles(numberOfTiles) {
    this.#difficultyScreen.classList.add("hidden");
    this.#gameScreen.classList.remove("hidden");
    this.#generateTiles(numberOfTiles);
    this.#initiateGuessingGame();
  }

  #generateTiles(numberOfTiles) {
    const colorsForTiles = this.#generateColorsForTiles(numberOfTiles);
    this.#createAndAppendTiles(colorsForTiles);
  }

  #generateColorsForTiles(numberOfTiles) {
    const colorsForTiles = [];
    const numberOfColorsInScheme = 3;

    for (let i = 0; i < numberOfTiles / numberOfColorsInScheme; i++) {
      const generatedColors = this.#generateColorScheme();
      colorsForTiles.push(...generatedColors);
    }
    
    // Get only the number of colors needed for a certain difficulty, because of the loop being running imprecisely, 4/3 = 1.33 -> 2. 5/3 = 1.66 -> 2, both generating 2 schemes -> 6 colors.
    return colorsForTiles.slice(0, numberOfTiles);
  }

  #createAndAppendTiles(colorsForTiles) {
    for (let i = 0; i < colorsForTiles.length; i++) {
      const tile = this.#createTile(colorsForTiles[i]);
      this.#originalTiles.push(tile);
      this.#gameBoard.appendChild(tile);
    }
  }

  #createTile(colorGenerated) {
    const tile = document.createElement("button");
    tile.classList.add("tile", "disabled");
    tile.style.backgroundColor = colorGenerated;
    return tile;
  }

  #generateColorScheme() {
    const colorScheme = [];
    const colorSchemeGenerator = new ColorSchemeGenerator();

    // The first color in the scheme to generate 2 analogous colors from.
    const color = this.#generateColorDependingOnTheme();
    colorScheme.push(color);

    // Generate 2 analogous colors from the first color.
    const generatedColors =
      colorSchemeGenerator.generateAnalogousColorScheme(color);
    for (let i = 0; i < generatedColors.length; i++) {
      colorScheme.push(generatedColors[i]);
    }
    
    return colorScheme;
  }

  #generateColorDependingOnTheme() {
    const colorGenerator = new ColorGenerator();
    const theme = this.themeSwitcher.getCurrentTheme();
    if (theme === "dark") {
      return colorGenerator.generateLightColor();
    } else if (theme === "light") {
      return colorGenerator.generateDarkColor();
    }
  }

  #initiateGuessingGame() {
    setTimeout(() => {
      this.#shuffledTiles = this.#shuffleTiles();
      this.#clearGameTiles();
      this.#recreateTiles();
      this.#updateGameTitleWithShuffledMessage();
      this.#revealUserGuesses();
      this.#gameTileOnClick();
      this.#userTileOnClick();
    }, 4000); // after 4 seconds do the above.
  }
  
  // Fisher-Yates shuffle algorithm.
  #shuffleTiles() {
    this.#shuffledTiles = Array.from(this.#originalTiles);
    for (let i = this.#shuffledTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.#shuffledTiles[i], this.#shuffledTiles[j]] = [
        this.#shuffledTiles[j],
        this.#shuffledTiles[i],
      ];
    }
    return this.#shuffledTiles;
  }

  #clearGameTiles() {
    while (this.#gameBoard.firstChild) {
      this.#gameBoard.removeChild(this.#gameBoard.firstChild);
    }
  }
  
  #recreateTiles() {
    this.#shuffledTiles.forEach((tile) => {
      const newTile = document.createElement("button");
      newTile.classList.add("tile");
      newTile.style.backgroundColor = tile.style.backgroundColor;
      this.#gameBoard.appendChild(newTile);
    });
  }

  #updateGameTitleWithShuffledMessage() {
    const gameTitle = document.querySelector("#game-screen h2");
    gameTitle.textContent = "Tiles shuffled!";
  }
  
  #revealUserGuesses () {
    document.getElementById("user-guesses").classList.remove("hidden");
  }

  #gameTileOnClick() {
    document.querySelectorAll("#game-board .tile").forEach((tile) => {
      tile.addEventListener("click", () => {
        const userTile = document.createElement("button");
        userTile.classList.add("tile");
        userTile.style.backgroundColor = tile.style.backgroundColor;
        document.getElementById("guesses").appendChild(userTile);
        this.#userTiles.push(userTile);
      });
    });
  }

  #userTileOnClick() {
    document.getElementById("guesses").addEventListener("click", (event) => {
      const userTile = event.target;
      if (userTile.classList.contains("tile")) {
        this.#removeUserTile(userTile);
      }
    });
  }

  #removeUserTile(userTile) {
    const index = this.#userTiles.indexOf(userTile);
    this.#userTiles.splice(index, 1);
    userTile.remove();
  }

  #isGameWon() {
    if (!this.#isTileLengthCorrect()) {
      return false;
    }
    for (let i = 0; i < this.#originalTiles.length; i++) {
      if (!this.#isTileColorCorrect(i)) {
        return false;
      }
    }
    return true;
  }

  #isTileLengthCorrect() {
    if (this.#originalTiles.length === this.#userTiles.length) {
      return true;
    } else {
      return false;
    }
  }

  #isTileColorCorrect(i) {
    if (
      this.#originalTiles[i].style.backgroundColor ===
      this.#userTiles[i].style.backgroundColor
    ) {
      return true;
    } else {
      return false;
    }
  }

  #endGame() {
    const submitGameButton = document.getElementById("game-submit");
    submitGameButton.addEventListener("click", () => {
      this.#gameScreen.classList.add("hidden");
      this.#endScreen.classList.remove("hidden");
      this.#displayEndMessage();
    });
  }

  #displayEndMessage() {
    const endMessage = document.querySelector("#end-screen h2");
    const username = localStorage.getItem("username");
    if (this.#isGameWon()) {
      endMessage.textContent = `Congratulations ${username}! You won!`;
    } else {
      endMessage.textContent = `Sorry ${username}, you lost!`;
    }
  }

  #playAgain() {
    const playAgainButton = document.getElementById("play-again");
    playAgainButton.addEventListener("click", () => {
      this.#clearGameTiles();
      this.#resetGameTiles();
      this.#clearUserTiles();
      this.#resetUserTiles();
      this.#resetGuessingGame();
      this.#removeWarningIfUsernameNotEmpty();
    });
  }

  #resetGameTiles() {
    this.#originalTiles = [];
  }

  #clearUserTiles() {
    const userTiles = document.getElementById("guesses");
    while (userTiles.firstChild) {
      userTiles.removeChild(userTiles.firstChild);
    }
  }

  #resetUserTiles() {
    this.#userTiles = [];
  }

  #resetGuessingGame() {
    const gameTitle = document.querySelector("#game-screen h2");
    gameTitle.textContent = "Shuffling tiles...";
    document.getElementById("user-guesses").classList.add("hidden");
    this.#endScreen.classList.add("hidden");
    this.#startScreen.classList.remove("hidden");

  }
}
