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
        this.#generateEasyLevel();
      }
    });
  }

  #generateEasyLevel() {
    const easyLevelArray = [];
    const colorScheme = this.#generateColors();
    for (let i = 0; i < 3; i++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.style.backgroundColor = colorScheme[i];
      easyLevelArray.push(tile);
    }
    const gameBoard = document.getElementById('game-board');
    for (let i = 0; i < easyLevelArray.length; i++) {
      gameBoard.appendChild(easyLevelArray[i]);
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
      const username = localStorage.getItem('username');
      document.querySelector('h3').textContent += ` Congratulations ${username}!`;
    });
  }

  #playAgain() {
    this.#playAgainButton.addEventListener('click', () => {
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