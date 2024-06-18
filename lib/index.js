const fs = require('fs');
const path = require('path');

const logFile = 'audit.log';

/**
 * Logs a message to the audit log file.
 * @param {string} message The message to log.
 */
function logMessage(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFile, `${timestamp} - ${message}\n`);
}

/**
 * Moves files with specified extensions from source directory to target directory.
 * @param {string} srcDir The source directory path.
 * @param {string[]} extensions Array of file extensions to move.
 * @param {string} targetDir The target directory path.
 */
function moveFiles(srcDir, extensions, targetDir) {
  extensions.forEach(extension => {
    const files = fs.readdirSync(srcDir).filter(file => file.endsWith(`.${extension}`));
    if (files.length > 0) {
      console.log(colorize(`Organizing files with .${extension} extension in ${srcDir}...`));
      files.forEach(file => {
        const srcPath = path.join(srcDir, file);
        const targetPath = path.join(targetDir, file);
        fs.renameSync(srcPath, targetPath);
        logMessage(`Moved ${file} to ${targetDir}`);
      });
      console.log(colorize(`Files with .${extension} extension have been moved to ${targetDir}`));
    } else {
      console.log(colorize(`No files found with .${extension} extension in ${srcDir}`));
      logMessage(`No files found with .${extension} extension in ${srcDir}`);
    }
  });
}

/**
 * Adds cyan color to text output in the console.
 * @param {string} text The text to colorize.
 * @returns {string} The colorized text.
 */
function colorize(text) {
  return `\x1b[36m${text}\x1b[0m`;  // Cyan color
}

module.exports = { moveFiles, logMessage, colorize };