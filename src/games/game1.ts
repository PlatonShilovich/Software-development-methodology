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

export const gameDescription = 'Find the smallest common multiple of given numbers.';

export function generateQuestionAndAnswer(): { question: string; answer: string } {
  const num1 = Math.floor(Math.random() * 100) + 1;
  const num2 = Math.floor(Math.random() * 100) + 1;
  const num3 = Math.floor(Math.random() * 100) + 1;
  const question = `${num1} ${num2} ${num3}`;
  const answer = calculateLCM(num1, num2, num3).toString();
  return { question, answer };
}
