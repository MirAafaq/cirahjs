#!/usr/bin/env node

const { moveFiles, logMessage } = require('../lib/index');
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
 \____| |___| |_| \_\ /_/   \_\ |_| |_|
                                
`));
  console.log(chalk.green('Developed by: Aafaq Ahmad Mir'));
  console.log(chalk.green('GitHub: github.com/miraafaq'));
  console.log(chalk.green('Website: https://miraafaq.in'));
  
  rl.question(colorize('Enter the source directory (default is current directory): '), (srcDir) => {
    srcDir = srcDir || '.';
    rl.question(colorize('Enter the extensions separated by spaces (e.g., txt pdf): '), (extensions) => {
      const extArray = extensions.split(' ');
      rl.question(colorize('Enter the target directory name (will be created if not exists): '), (targetDirName) => {
        const targetDir = path.join(srcDir, targetDirName);
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
          logMessage(`Created target directory: ${targetDir}`);
        }
        moveFiles(srcDir, extArray, targetDir);
        rl.close();
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

module.exports = { moveFiles, logMessage };