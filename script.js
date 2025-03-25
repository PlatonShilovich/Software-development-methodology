"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var projectPath = path.resolve('/Users/platon/software-development-methodology'); // Путь к проекту
var outputFilePath = path.join('/Users/platon/software-development-methodology', 'project_structure.txt'); // Выходной файл
var includeExtensions = ['.ts', '.js', '.md', '.tsx', '.prisma', 'scss', 'json', 'yml']; // Фильтр по расширениям
var ignoreFolders = ['node_modules']; // Игнорируемые папки
var ignoreFiles = ['README.md', 'exportProject.ts', 'package-lock.json']; // Файлы, которые НЕ должны записываться
// Функция для рекурсивного обхода файлов
function readFilesRecursively(dir, prefix) {
    if (prefix === void 0) { prefix = '-'; }
    var output = "".concat(prefix, " ").concat(path.basename(dir), "\n");
    var files = fs.readdirSync(dir);
    var _loop_1 = function (file) {
        var filePath = path.join(dir, file);
        var stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (!ignoreFolders.includes(file)) {
                output += readFilesRecursively(filePath, "\t".concat(prefix));
            }
        }
        else if (includeExtensions.some(function (ext) { return file.endsWith(ext); })
            && !ignoreFiles.includes(file) // Проверка, чтобы файл не был в списке игнорируемых
        ) {
            var content = fs.readFileSync(filePath, 'utf8');
            output += "\t".concat(prefix, " ").concat(file, ":\n");
            output
                += "".concat(content
                    .split('\n')
                    .map(function (line) { return "\t\t".concat(line); })
                    .join('\n'), "\n\n");
        }
    };
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        _loop_1(file);
    }
    return output;
}
// Читаем структуру проекта и записываем в файл
var projectStructure = readFilesRecursively(projectPath);
fs.writeFileSync(outputFilePath, projectStructure, 'utf8');
console.log("\u0424\u0430\u0439\u043B \u0441 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u044B\u043C \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D: ".concat(outputFilePath));
