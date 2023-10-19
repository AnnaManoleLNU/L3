import { ColorGenerator } from "../../lib/js/ColorGenerator.js";
import { ColorSchemeGenerator } from "../../lib/js/ColorSchemeGenerator.js";

export class ColorMemoryGame {
  #startScreen;
  #difficultyScreen;
  #gameScreen;
  #gameBoard;
  #endScreen;
  #originalTiles = [];
  #shuffledTiles = [];
  #userTiles = [];
  // #themeSwitcher;
  // #colorGenerator;
  // #colorSchemeGenerator;


  constructor(themeSwitcher, colorGenerator, colorSchemeGenerator) {
    this.#startScreen = document.getElementById("start-screen");
    this.#difficultyScreen = document.getElementById("difficulty-screen");
    this.#gameScreen = document.getElementById("game-screen");
    this.#gameBoard = document.getElementById("game-board");
    this.#endScreen = document.getElementById("end-screen");

    this.themeSwitcher = themeSwitcher;
    this.colorGenerator = colorGenerator;
    this.colorSchemeGenerator = colorSchemeGenerator;

  }

  initiateGame() {
    this.#startGame();
    this.#selectDifficulty();
    this.#endGame();
    this.#playAgain();
  }

  #startGame() {
    const usernameInput = document.getElementById("username-input");
    const usernameForm = document.getElementById("username-form");
    usernameForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.#startScreen.classList.add("hidden");
      this.#difficultyScreen.classList.remove("hidden");
      localStorage.setItem("username", usernameInput.value);
      usernameInput.value = "";
    });
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
    const colorsForTiles = [];
    const numberOfColorsInScheme = 3;

    for (let i = 0; i < numberOfTiles / numberOfColorsInScheme; i++) {
      const generatedColors = this.#generateColors();
      for (let i = 0; i < generatedColors.length; i++) {
        colorsForTiles.push(generatedColors[i]);
      }
    }

    for (let i = 0; i < numberOfTiles; i++) {
      const tile = document.createElement("button");
      tile.classList.add("tile");
      tile.classList.add("disabled");
      tile.style.backgroundColor = colorsForTiles[i];
      this.#originalTiles.push(tile);
    }

    for (let i = 0; i < this.#originalTiles.length; i++) {
      this.#gameBoard.appendChild(this.#originalTiles[i]);
    }
  }

  #generateColors() {
    const colorScheme = [];
    let color;

    const theme = this.themeSwitcher.getcurrentTheme();
    if (theme === "dark") {
      color = this.colorGenerator.generateLightColor();
      colorScheme.push(color);
    } else if (theme === "light") {
      color = this.colorGenerator.generateDarkColor();
      colorScheme.push(color);
    }

    const generatedColors =
      this.colorSchemeGenerator.generateAnalogousColorScheme(color);
    for (let i = 0; i < generatedColors.length; i++) {
      colorScheme.push(generatedColors[i]);
    }
    return colorScheme;
  }

  #initiateGuessingGame() {
    setTimeout(() => {
      this.#shuffledTiles = this.#shuffleTiles();
      while (this.#gameBoard.firstChild) {
        this.#gameBoard.removeChild(this.#gameBoard.firstChild);
      }
      // Reconstructing and appending shuffled tiles
      this.#shuffledTiles.forEach((tile) => {
        const newTile = document.createElement("button");
        newTile.classList.add("tile");
        newTile.style.backgroundColor = tile.style.backgroundColor;
        this.#gameBoard.appendChild(newTile);
      });

      const gameTitle = document.querySelector("#game-screen h2");
      gameTitle.textContent = "Tiles shuffled!";
      document.getElementById("user-guesses").classList.remove("hidden");

      this.#gameTileOnClick();
      this.#userTileOnClick();
    }, 4000);
  }

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
      this.#clearTiles();
      this.#removeUserGuesses();
      this.#resetGuessingGame();
      this.#endScreen.classList.add("hidden");
      this.#startScreen.classList.remove("hidden");
    });
  }

  #clearTiles() {
    while (this.#gameBoard.firstChild) {
      this.#gameBoard.removeChild(this.#gameBoard.firstChild);
    }
    this.#originalTiles = [];
  }

  #removeUserGuesses() {
    const userTiles = document.getElementById("guesses");
    while (userTiles.firstChild) {
      userTiles.removeChild(userTiles.firstChild);
    }
    this.#userTiles = [];
  }

  #resetGuessingGame() {
    const gameTitle = document.querySelector("#game-screen h2");
    gameTitle.textContent = "Shuffling tiles...";
    document.getElementById("user-guesses").classList.add("hidden");
  }
}
