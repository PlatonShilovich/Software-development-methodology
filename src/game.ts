import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}

function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function calculateLCM(a: number, b: number, c: number): number {
  return lcm(lcm(a, b), c);
}

async function main() {
  console.log('Welcome to the Brain Games!');
  const name = await askQuestion('May I have your name? ');
  console.log(`Hello, ${name}!`);
  console.log('Find the smallest common multiple of given numbers.');

  let correctAnswers = 0;
  while (correctAnswers < 3) {
    const num1 = Math.floor(Math.random() * 100) + 1;
    const num2 = Math.floor(Math.random() * 100) + 1;
    const num3 = Math.floor(Math.random() * 100) + 1;
    const question = `Question: ${num1} ${num2} ${num3}\nYour answer: `;
    const userAnswer = await askQuestion(question);
    const correctAnswer = calculateLCM(num1, num2, num3).toString();

    if (userAnswer === correctAnswer) {
      console.log('Correct!');
      correctAnswers++;
    } else {
      console.log(`'${userAnswer}' is wrong answer ;(. Correct answer was '${correctAnswer}'.`);
      console.log(`Let's try again, ${name}!`);
      break;
    }
  }

  if (correctAnswers === 3) {
    console.log(`Congratulations, ${name}!`);
  }
  rl.close();
}

main();