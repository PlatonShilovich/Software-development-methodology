import * as readline from "readline";
import { runGame, askQuestion } from "./engine"; // Импортируем askQuestion
import {
  gameDescription as game1Description,
  generateQuestionAndAnswer as generateGame1,
} from "./games/game1";
import {
  gameDescription as game2Description,
  generateQuestionAndAnswer as generateGame2,
} from "./games/game2";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function selectGame() {
  console.log("Welcome to the Brain Games!");
  console.log("Please select a game:");
  console.log("1. Find the smallest common multiple of given numbers. (НОК)");
  console.log("2. What number is missing in the progression?");

  const choice = await askQuestion(rl, "Enter 1 or 2: "); // Используем askQuestion из engine.ts

  if (choice === "1") {
    await runGame(rl, game1Description, generateGame1);
  } else if (choice === "2") {
    await runGame(rl, game2Description, generateGame2);
  } else {
    console.log("Invalid choice. Please enter 1 or 2.");
  }

  rl.close();
}

selectGame().catch((err) => {
  console.error(err);
  rl.close();
});
