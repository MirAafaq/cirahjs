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
const version = '1.8.0';

function showVersion() {
  console.log(`cirahjs version ${version}`);
}

function showHelp() {
  console.log(`
Usage: cirah [options]

Options:
  --version    Show version number
  --help       Show help information
    undo       Undo an action   
  `);
}

const logFile = 'audit.log';
function main() {
  console.log(chalk.green(`
-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
|  CIRAH - PEACEFUL ADVENTURE WHEN SPEEDY TOOL  |
-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
  `));
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


const args = process.argv.slice(2);
if (args.length === 0) {
  main();
} else if (args.includes('--version')) {
  showVersion();
  rl.close();
} else if (args.includes('--help')) {
  showHelp();
  rl.close();
} else if (args.includes('undo') || args.includes('--undo') ) {
  undoLastMove();
  rl.close();
} else {
  console.log('Unknown command. Use --help to see available options.');
}

module.exports = { moveFiles, logMessage, undoLastMove };