function generateProgression(
  start: number,
  ratio: number,
  length: number
): number[] {
  const progression: number[] = [];
  let current = start;
  for (let i = 0; i < length; i += 1) {
    progression.push(current);
    current *= ratio;
  }
  return progression;
}

export const gameDescription = "What number is missing in the progression?";

export function generateQuestionAndAnswer(): {
  question: string;
  answer: string;
} {
  const length = Math.floor(Math.random() * 6) + 5; // От 5 до 10 чисел
  const start = Math.floor(Math.random() * 10) + 1; // Начало от 1 до 10
  const ratio = Math.floor(Math.random() * 4) + 2; // Коэффициент от 2 до 5
  const progression = generateProgression(start, ratio, length);
  const hiddenIndex = Math.floor(Math.random() * length);
  const question = progression
    .map((num, index) => (index === hiddenIndex ? ".." : num.toString()))
    .join(" ");
  const answer = progression[hiddenIndex].toString();
  return { question, answer };
}
