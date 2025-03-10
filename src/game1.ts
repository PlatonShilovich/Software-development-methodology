import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}

function gcd(a: number, b: number): number {
  let x = a;
  let y = b;
  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x;
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
    // eslint-disable-next-line no-await-in-loop
    const userAnswer = await askQuestion(question);
    const correctAnswer = calculateLCM(num1, num2, num3).toString();

    if (userAnswer === correctAnswer) {
      console.log('Correct!');
      correctAnswers += 1;
    } else {
      console.log(
        `'${userAnswer}' is wrong answer ;(. Correct answer was '${correctAnswer}'.`,
      );
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
