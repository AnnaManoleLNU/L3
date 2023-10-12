const usernamePrompt = document.getElementById('username-prompt');
const usernameInput = document.getElementById('username');
const usernameForm = document.getElementById('username-form');
const gameDisplay = document.getElementById('game-display');

// Add an event listener to the form
usernameForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the form from submitting
  const username = usernameInput.value;
  // Save the username in local storage
  localStorage.setItem('username', username);
  // hide the username input and button
  usernamePrompt.classList.add('hidden');
  usernameInput.classList.add('hidden');
  usernameForm.classList.add('hidden');
  // show the game display
  gameDisplay.classList.remove('hidden');
});