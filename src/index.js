import { ColorGenerator } from "./../lib/js/ColorGenerator.js";
import { ColorSchemeGenerator } from "./../lib/js/ColorSchemeGenerator.js";
import { ThemeSwitcher } from "./js/ThemeSwitcher.js";
import { ColorMemoryGame } from './js/ColorMemoryGame.js';


const themeSwitcher = new ThemeSwitcher();
const colorGenerator = new ColorGenerator();
const colorSchemeGenerator = new ColorSchemeGenerator();

const colorMemoryGame = new ColorMemoryGame(themeSwitcher, colorGenerator, colorSchemeGenerator);
colorMemoryGame.initiateGame();