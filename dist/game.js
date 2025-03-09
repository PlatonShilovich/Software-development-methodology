"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function askQuestion(query) {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
        });
    });
}
function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}
function calculateLCM(a, b, c) {
    return lcm(lcm(a, b), c);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Welcome to the Brain Games!');
        const name = yield askQuestion('May I have your name? ');
        console.log(`Hello, ${name}!`);
        console.log('Find the smallest common multiple of given numbers.');
        let correctAnswers = 0;
        while (correctAnswers < 3) {
            const num1 = Math.floor(Math.random() * 100) + 1;
            const num2 = Math.floor(Math.random() * 100) + 1;
            const num3 = Math.floor(Math.random() * 100) + 1;
            const question = `Question: ${num1} ${num2} ${num3}\nYour answer: `;
            const userAnswer = yield askQuestion(question);
            const correctAnswer = calculateLCM(num1, num2, num3).toString();
            if (userAnswer === correctAnswer) {
                console.log('Correct!');
                correctAnswers++;
            }
            else {
                console.log(`'${userAnswer}' is wrong answer ;(. Correct answer was '${correctAnswer}'.`);
                console.log(`Let's try again, ${name}!`);
                break;
            }
        }
        if (correctAnswers === 3) {
            console.log(`Congratulations, ${name}!`);
        }
        rl.close();
    });
}
main();
