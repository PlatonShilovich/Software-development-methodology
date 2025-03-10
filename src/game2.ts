import * as readline from 'readline';

// Create readline interface for console input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to generate a geometric progression
function generateProgression(start: number, ratio: number, length: number): number[] {
  const progression: number[] = [];
  let current = start;
  for (let i = 0; i < length; i += 1) { // Fixed: i++ replaced with i += 1
    progression.push(current);
    current *= ratio;
  }
  return progression;
}

// Function to ask a question and get the player's response
function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}

// Function to generate a question with a hidden number
function generateQuestion(): { question: string; answer: string } {
  const length = Math.floor(Math.random() * 6) + 5; // Random length between 5 and 10
  const start = Math.floor(Math.random() * 10) + 1; // Starting number between 1 and 10
  const ratio = Math.floor(Math.random() * 4) + 2; // Common ratio between 2 and 5
  const progression = generateProgression(start, ratio, length);
  const hiddenIndex = Math.floor(Math.random() * length); // Random position to hide
  const displayProgression = progression
    .map((num, index) => (index === hiddenIndex ? '..' : num.toString()))
    .join(' ');
  const correctAnswer = progression[hiddenIndex].toString();
  return { question: displayProgression, answer: correctAnswer };
}

// Main game function
async function playGame() {
  console.log('Welcome to the Brain Games!');
  const name = await askQuestion('May I have your name? ');
  console.log(`Hello, ${name}!`);
  console.log('What number is missing in the progression?');

  // Recursive function to ask questions
  const askNextQuestion = async (round: number) => {
    if (round > 3) {
      console.log(`Congratulations, ${name}!`);
      rl.close();
      return;
    }
    const { question, answer } = generateQuestion();
    console.log(`Question: ${question}`);
    const userAnswer = (await askQuestion('Your answer: ')).trim();
    if (userAnswer === answer) {
      console.log('Correct!');
      await askNextQuestion(round + 1);
    } else {
      console.log(`'${userAnswer}' is wrong answer ;(. Correct answer was '${answer}'.`);
      console.log(`Let's try again, ${name}!`);
      rl.close();
    }
  };

  // Start the game with the first question
  await askNextQuestion(1);
}

// Start the game and handle potential errors
playGame().catch(console.error);
