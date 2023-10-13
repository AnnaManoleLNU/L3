export class Game {
  #startScreen
  #usernameForm
  #usernameInput
  // #submitUsernameButton // i use the form instead
  #gameScreen
  #submitGameButton
  #endScreen
  #playAgainButton

  constructor() {
    this.#startScreen = document.getElementById('start-screen');
    this.#usernameForm = document.getElementById('username-form');
    this.#usernameInput = document.getElementById('username-input');
    // this.#submitUsernameButton = document.getElementById('username-submit');
    this.#gameScreen = document.getElementById('game-screen');
    this.#submitGameButton = document.getElementById('game-submit');
    this.#endScreen = document.getElementById('end-screen');
    this.#playAgainButton = document.getElementById('play-again');
  }

  #startGame() {
    this.#usernameForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this.#startScreen.classList.add('hidden');
      this.#gameScreen.classList.remove('hidden');
      localStorage.setItem('username', this.#usernameInput.value);
      this.#usernameInput.value = '';
      console.log(localStorage.getItem('username'));
    });
  }

  #endGame() {
    this.#submitGameButton.addEventListener('click', () => {
      this.#gameScreen.classList.add('hidden');
      this.#endScreen.classList.remove('hidden');
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
    this.#endGame();
    this.#playAgain();
  }

}