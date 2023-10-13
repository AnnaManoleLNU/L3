import { ColorGenerator } from '../../lib/js/ColorGenerator.js'
import { ColorSchemeGenerator } from '../../lib/js/ColorSchemeGenerator.js'

export class Game {
  #startScreen
  #usernameForm
  #usernameInput
  #difficultyScreen
  #gameScreen
  #submitGameButton
  #endScreen
  #playAgainButton
  #tiles = [] // the original tiles
  #shuffledTiles = []
  #userTiles = [] // the tiles the user clicks on
  #tile

  constructor() {
    this.#startScreen = document.getElementById('start-screen');
    this.#usernameForm = document.getElementById('username-form');
    this.#usernameInput = document.getElementById('username-input');
    this.#difficultyScreen = document.getElementById('difficulty-screen');
    this.#gameScreen = document.getElementById('game-screen');
    this.#submitGameButton = document.getElementById('game-submit');
    this.#endScreen = document.getElementById('end-screen');
    this.#playAgainButton = document.getElementById('play-again');
  }

  #startGame() {
    this.#usernameForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.#startScreen.classList.add('hidden');
      this.#difficultyScreen.classList.remove('hidden');
      localStorage.setItem('username', this.#usernameInput.value);
      this.#usernameInput.value = '';
    });
  }

  #selectDifficulty() {
    this.#difficultyScreen.addEventListener('click', (event) => {
      const difficulty = event.target.id;
      if (difficulty === 'easy') {
        this.#difficultyScreen.classList.add('hidden');
        this.#gameScreen.classList.remove('hidden');
        this.#generateTiles(3);
        this.#initiateGuessingGame();
      }
      if (difficulty === 'medium') {
        this.#difficultyScreen.classList.add('hidden');
        this.#gameScreen.classList.remove('hidden');
        this.#generateTiles(6);
        this.#initiateGuessingGame();
      }
      if (difficulty === 'hard') {
        this.#difficultyScreen.classList.add('hidden');
        this.#gameScreen.classList.remove('hidden');
        this.#generateTiles(9);
        this.#initiateGuessingGame();
      }
    });
  }

  /**
   * Generates tiles as buttons, based on the number of tiles passed in.
   *
   * @param {number} numberOfTiles 
   */
  #generateTiles(numberOfTiles) {
    const colorScheme = []
    // run the generate colors method for the number of tiles divided by number of colors in the scheme (3/3 or 6/3 or 9/3)
    for (let i = 0; i < numberOfTiles / 3; i++) {
      const generatedColors = this.#generateColors();
      for (let i = 0; i < generatedColors.length; i++) {
        colorScheme.push(generatedColors[i]);
      }
    }
    for (let i = 0; i < numberOfTiles; i++) {
      this.#tile = document.createElement('button');
      this.#tile.classList.add('tile');
      this.#tile.classList.add('disabled');
      this.#tile.style.backgroundColor = colorScheme[i];
      this.#tiles.push(this.#tile);
    }
    const gameBoard = document.getElementById('game-board');
    for (let i = 0; i < this.#tiles.length; i++) {
      gameBoard.appendChild(this.#tiles[i]);
    }
  }

  #clearTiles() {
    const gameBoard = document.getElementById('game-board');
    while (gameBoard.firstChild) {
      gameBoard.removeChild(gameBoard.firstChild);
    }
    this.#tiles = [];
  }

  #shuffleTiles() {
    this.#shuffledTiles = Array.from(this.#tiles);
    for (let i = this.#shuffledTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.#shuffledTiles[i], this.#shuffledTiles[j]] = [this.#shuffledTiles[j], this.#shuffledTiles[i]];
    }
    return this.#shuffledTiles;
  }

  #initiateGuessingGame() {
    setTimeout(() => {
      this.#shuffledTiles = this.#shuffleTiles();
      const gameBoard = document.getElementById('game-board');
      while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
      }
      // Reconstructing and appending shuffled tiles
      this.#shuffledTiles.forEach(tile => {
        const newTile = document.createElement('button');
        newTile.classList.add('tile');
        newTile.style.backgroundColor = tile.style.backgroundColor;
        gameBoard.appendChild(newTile);
      });

      const gameTitle = document.querySelector('#game-screen h2');
      gameTitle.textContent = 'Tiles shuffled!';
      document.getElementById('user-guesses').classList.remove('hidden');

      this.#tileOnClick();
    }, 4000);
  }

  #tileOnClick() {
    document.querySelectorAll('#game-board .tile').forEach(tile => {
      tile.addEventListener('click', () => {
        console.log('Tile clicked! Color:', tile.style.backgroundColor);
        const userTile = document.createElement('button');
        userTile.classList.add('tile');
        userTile.style.backgroundColor = tile.style.backgroundColor;
        document.getElementById('guesses').appendChild(userTile);
        this.#userTiles.push(userTile);
      });
    });
  }

  #isGameWon() {
    console.log('Tiles:', this.#tiles);
    console.log('User tiles:', this.#userTiles);
    for (let i = 0; i < this.#tiles.length; i++) {
      if (this.#tiles[i].style.backgroundColor === this.#userTiles[i].style.backgroundColor) {
        return true;
      } else {
        return false;
      }
    }
  }

  #displayEndMessage() {
    const endMessage = document.querySelector('#end-screen h2');
    if (this.#isGameWon()) {
      endMessage.textContent = 'You won!';
    } else {
      endMessage.textContent = 'You lost!';
    }
  }

  #removeUserGuesses() {
    const userTiles = document.getElementById('guesses');
    while (userTiles.firstChild) {
      userTiles.removeChild(userTiles.firstChild);
    }
  }


  #generateColors() {
    const colorScheme = [];
    const colorGenerator = new ColorGenerator();
    const color = colorGenerator.generateLightColor();
    colorScheme.push(color);

    const colorSchemeGenerator = new ColorSchemeGenerator();
    const generatedColors = colorSchemeGenerator.generateAnalogousColorScheme(color);
    for (let i = 0; i < generatedColors.length; i++) {
      colorScheme.push(generatedColors[i]);
    }
    return colorScheme;
  }


  #endGame() {
    this.#submitGameButton.addEventListener('click', () => {
      this.#gameScreen.classList.add('hidden');
      this.#endScreen.classList.remove('hidden');
      // check if the game was won
      this.#displayEndMessage();
    });
  }

  #playAgain() {
    this.#playAgainButton.addEventListener('click', () => {
      // clear the game board for the next game
      this.#clearTiles();
      // clear the user's guesses
      this.#removeUserGuesses();
      this.#endScreen.classList.add('hidden');
      this.#startScreen.classList.remove('hidden');
    });
  }


  playGame() {
    this.#startGame();
    this.#selectDifficulty();
    this.#endGame();
    this.#playAgain();
  }

}