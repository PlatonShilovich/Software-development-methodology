import * as fs from 'fs';
import * as path from 'path';

const projectPath = path.resolve('/Users/platon/software-development-methodology'); // Путь к проекту
const outputFilePath = path.join('/Users/platon/software-development-methodology', 'project_structure.txt'); // Выходной файл
const includeExtensions = ['.ts', '.js', '.md', '.tsx', '.prisma', 'scss', 'json', 'yml']; // Фильтр по расширениям
const ignoreFolders = ['node_modules']; // Игнорируемые папки
const ignoreFiles = ['README.md', 'exportProject.ts', 'package-lock.json']; // Файлы, которые НЕ должны записываться

// Функция для рекурсивного обхода файлов
function readFilesRecursively(dir: string, prefix: string = '-'): string {
  let output = `${prefix} ${path.basename(dir)}\n`;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!ignoreFolders.includes(file)) {
        output += readFilesRecursively(filePath, `\t${prefix}`);
      }
    } else if (
      includeExtensions.some((ext) => file.endsWith(ext))
      && !ignoreFiles.includes(file) // Проверка, чтобы файл не был в списке игнорируемых
    ) {
      const content = fs.readFileSync(filePath, 'utf8');
      output += `\t${prefix} ${file}:\n`;
      output
        += `${content
          .split('\n')
          .map((line) => `\t\t${line}`)
          .join('\n')}\n\n`;
    }
  }

  return output;
}

// Читаем структуру проекта и записываем в файл
const projectStructure = readFilesRecursively(projectPath);
fs.writeFileSync(outputFilePath, projectStructure, 'utf8');

console.log(`Файл с содержимым проекта сохранен: ${outputFilePath}`);
