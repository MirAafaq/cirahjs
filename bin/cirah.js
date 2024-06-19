#!/usr/bin/env node

const { moveFiles, logMessage, undoLastMove, colorize } = require('../lib/index');
const chalk = require('chalk');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

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
 \____| |___| |_| \_\ /_/   \_\ |_| |_|`));
 console.log(chalk.green('-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-'));
 console.log(chalk.green('| Fastest File Organizer ~ Cirah        |'));
 console.log(chalk.green('| Developed by: Aafaq Ahmad Mir         |'));
 console.log(chalk.green('| GitHub: https://github.com/miraafaq   |'));
 console.log(chalk.green('-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-'));

  rl.question(colorize('Enter the source directory (default is current directory): '), (srcDir) => {
    srcDir = srcDir || '.';
    rl.question(colorize('Enter the extensions separated by spaces (e.g., txt pdf): '), (extensions) => {
      const extArray = extensions.split(' ');
      rl.question(colorize('Enter the target directory name (will be created if not exists): '), (targetDirName) => {
        const targetDir = path.join(srcDir, targetDirName);
        moveFiles(srcDir, extArray, targetDir);
        rl.close();
      });
    });
  });
}

// Handle command line arguments for undo operation
if (process.argv[2] === 'undo') {
  undoLastMove();
} else {
  main();
}

module.exports = { moveFiles, logMessage, undoLastMove };