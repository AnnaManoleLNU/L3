import { ColorMemoryGame } from "./js/ColorMemoryGame.js";
import { ThemeSwitcher } from "./js/ThemeSwitcher.js";

const themeSwitcher = new ThemeSwitcher();
const colorMemoryGame = new ColorMemoryGame(themeSwitcher);
colorMemoryGame.initiateGame();
