#!/usr/bin/env node

const readline = require('readline');
const chalk = require('chalk');
const { moveFiles, logMessage, undoLastMove } = require('../lib/index');
const path = require('path');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const logFile = 'audit.log';

function main() {
  console.log(chalk.green(`
  ____   ___   ____       _      _   _ 
 / ___| |_ _| |  _ \     / \    | | | |
| |      | |  | |_) |   / _ \   | |_| |
| |___   | |  |  _ <   / ___ \  |  _  |
 \____| |___| |_| \_\ /_/   \_\ |_| |_|
                                
`));
console.log(chalk.green('Developed by: Aafaq Ahmad Mir'));
console.log(chalk.green('GitHub: github.com/miraafaq'));
console.log(chalk.green('Website: https://miraafaq.in'));

rl.question('Enter the extension (e.g., txt, pdf): ', extension => {
  rl.question('Enter the target directory name (will be created if not exists): ', targetDirName => {
    const targetDir = path.resolve(targetDirName);
    rl.question(`Are you sure you want to move all .${extension} files to ${targetDir}? (y/n): `, answer => {
      if (answer.toLowerCase() === 'y') {
        rl.question('Do you want to create symbolic links in the original location? (y/n): ', symlinkAnswer => {
          const createSymlink = symlinkAnswer.toLowerCase() === 'y';
          moveFiles('.', [extension], targetDir, createSymlink);
          rl.close();
        });
      } else {
        console.log('Operation cancelled.');
        rl.close();
      }
    });
  });
});
}

function colorize(text) {
return chalk.cyan(text);
}

if (require.main === module) {
main();
}

module.exports = { moveFiles, logMessage, undoLastMove };