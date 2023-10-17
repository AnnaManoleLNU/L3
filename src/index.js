import { ColorMemoryGame } from './js/ColorMemoryGame.js';
import { ThemeSwitcher } from './js/ThemeSwitcher.js';

const colorMemoryGame = new ColorMemoryGame();
colorMemoryGame.initiateGame();

const themeSwitcher = new ThemeSwitcher();
themeSwitcher.initiateThemeSwitcher();