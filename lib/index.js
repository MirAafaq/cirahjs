const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const log = require('simple-node-logger').createSimpleLogger('audit.log');

let lastMoveOperations = [];

function createBackup(filePath) {
    const backupPath = `${filePath}.bak`;
    fs.copyFileSync(filePath, backupPath);
    log.info(`Backup created for ${filePath} at ${backupPath}`);
}

function moveFiles(srcDir, extensions, targetDir, createSymlink = false) {
    extensions.forEach(ext => {
        const files = fs.readdirSync(srcDir).filter(file => file.endsWith(`.${ext}`));
        files.forEach(file => {
            const srcPath = path.join(srcDir, file);
            const targetPath = path.join(targetDir, file);
            createBackup(srcPath);  // Create backup before moving
            fs.renameSync(srcPath, targetPath);
            lastMoveOperations.push({ srcPath, targetPath });  // Save the move operation
            if (createSymlink) {
                fs.symlinkSync(targetPath, srcPath);
                log.info(`Created symlink from ${srcPath} to ${targetPath}`);
                console.log(chalk.cyan(`Created symlink from ${srcPath} to ${targetPath}`));
            }
            log.info(`Moved ${srcPath} to ${targetPath}`);
            console.log(chalk.cyan(`Moved ${srcPath} to ${targetPath}`));
        });
    });
}

function undoLastMove() {
    if (lastMoveOperations.length === 0) {
        log.warn("No operations to undo");
        console.log(chalk.yellow("No operations to undo"));
        return;
    }
    const { srcPath, targetPath } = lastMoveOperations.pop();
    fs.renameSync(targetPath, srcPath);
    log.info(`Moved ${targetPath} back to ${srcPath}`);
    console.log(chalk.cyan(`Moved ${targetPath} back to ${srcPath}`));
}

function logMessage(message) {
    log.info(message);
    console.log(chalk.cyan(message));
}

module.exports = { moveFiles, logMessage, undoLastMove };
