import type * as readline from 'readline';

export async function runGame(
  rl: readline.Interface, // Принимаем интерфейс как параметр
  gameDescription: string,
  generateQuestionAndAnswer: () => { question: string; answer: string },
) {
  console.log('Welcome to the Brain Games!');
  const name = await askQuestion(rl, 'May I have your name? ');
  console.log(`Hello, ${name}!`);
  console.log(gameDescription);

  let correctAnswers = 0;
  while (correctAnswers < 3) {
    const { question, answer } = generateQuestionAndAnswer();
    console.log(`Question: ${question}`);
    const userAnswer = await askQuestion(rl, 'Your answer: ');

    if (userAnswer.trim() === answer) {
      console.log('Correct!');
      correctAnswers += 1;
    } else {
      console.log(
        `'${userAnswer}' is wrong answer ;(. Correct answer was '${answer}'.`,
      );
      console.log(`Let's try again, ${name}!`);
      break;
    }
  }

  if (correctAnswers === 3) {
    console.log(`Congratulations, ${name}!`);
  }
}

async function askQuestion(rl: readline.Interface, query: string): Promise<string> {
  return await new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}