const fs = require('fs');
const path = require('path');

const logFile = 'audit.log';
const undoStackFile = 'undoStack.json'; // File to persist undo stack

let undoStack = [];

/**
 * Logs a message to the audit log file.
 * @param {string} message The message to log.
 */
function logMessage(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFile, `${timestamp} - ${message}\n`);
}

/**
 * Loads the undo stack from the file.
 */
function loadUndoStack() {
  if (fs.existsSync(undoStackFile)) {
    const data = fs.readFileSync(undoStackFile);
    undoStack = JSON.parse(data);
  }
}

/**
 * Saves the undo stack to the file.
 */
function saveUndoStack() {
  if (undoStack.length === 0) {
    if (fs.existsSync(undoStackFile)) {
      fs.unlinkSync(undoStackFile);
    }
  } else {
    fs.writeFileSync(undoStackFile, JSON.stringify(undoStack, null, 2));
  }
}

/**
 * Moves files with specified extensions from source directory to target directory.
 * @param {string} srcDir The source directory path.
 * @param {string[]} extensions Array of file extensions to move.
 * @param {string} targetDir The target directory path.
 */
function moveFiles(srcDir, extensions, targetDir) {
  let createdTargetDir = false;

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    createdTargetDir = true;
    logMessage(`Created target directory: ${targetDir}`);
  }

  extensions.forEach(extension => {
    const files = fs.readdirSync(srcDir).filter(file => file.endsWith(`.${extension}`));
    if (files.length > 0) {
      console.log(colorize(`Organizing files with .${extension} extension in ${srcDir}...`));
      files.forEach(file => {
        const srcPath = path.join(srcDir, file);
        const targetPath = path.join(targetDir, file);

        // Perform the move operation
        fs.renameSync(srcPath, targetPath);
        logMessage(`Moved ${file} to ${targetDir}`);

        // Push to undo stack
        undoStack.push({ srcPath, targetPath, targetDir, createdTargetDir });
        createdTargetDir = false; // Only mark the first creation
        console.log(`Pushed to undo stack: ${targetPath} -> ${srcPath}`); // Debugging statement
        saveUndoStack(); // Save the updated stack to the file
      });
      console.log(colorize(`Files with .${extension} extension have been moved to ${targetDir}`));
    } else {
      console.log(colorize(`No files found with .${extension} extension in ${srcDir}`));
      logMessage(`No files found with .${extension} extension in ${srcDir}`);
    }
  });
}

/**
 * Undoes the last move operation, restoring files to their original location.
 */
function undoLastMove() {
  loadUndoStack(); // Load the stack from the file
  if (undoStack.length === 0) {
    console.log(colorize("No operations to undo"));
    return;
  }

  const { srcPath, targetPath, targetDir, createdTargetDir } = undoStack.pop();
  console.log(`Popped from undo stack: ${targetPath} -> ${srcPath}`); // Debugging statement
  
  try {
    // Move the file back to its original location
    fs.renameSync(targetPath, srcPath);
    logMessage(`Moved ${targetPath} back to ${srcPath}`);
    console.log(colorize(`Moved ${targetPath} back to ${srcPath}`));

    // Check if the target directory is empty after undo
    if (createdTargetDir && fs.readdirSync(targetDir).length === 0) {
      fs.rmdirSync(targetDir);
      logMessage(`Removed empty target directory: ${targetDir}`);
      console.log(colorize(`Removed empty target directory: ${targetDir}`));
    }

    saveUndoStack(); // Save the updated stack to the file
  } catch (err) {
    console.error(colorize(`Error undoing move operation: ${err.message}`));
  }
  
}

/**
 * Adds cyan color to text output in the console.
 * @param {string} text The text to colorize.
 * @returns {string} The colorized text.
 */
function colorize(text) {
  return `\x1b[36m${text}\x1b[0m`;  // Cyan color
}

module.exports = { moveFiles, logMessage, colorize, undoLastMove };
