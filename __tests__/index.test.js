const fs = require('fs');
const path = require('path');
const { moveFiles, logMessage } = require('../lib/index');  // Adjust the path as necessary

describe('File Organizer', () => {
  const srcDir = path.join(__dirname, 'testSrc');
  const targetDir = path.join(__dirname, 'testTarget');
  const testFileTxt = 'testFile.txt';
  const testFilePdf = 'testFile.pdf';

  // Ensure directories are created before tests
  beforeAll(() => {
    if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
    fs.writeFileSync(path.join(srcDir, testFileTxt), 'Test file content');
    fs.writeFileSync(path.join(srcDir, testFilePdf), 'Test file content');
  });

  // Clean up after tests
  afterAll(() => {
    // Delete test files in srcDir
    try {
      if (fs.existsSync(path.join(srcDir, testFileTxt))) {
        fs.unlinkSync(path.join(srcDir, testFileTxt));
      }
      if (fs.existsSync(path.join(srcDir, testFilePdf))) {
        fs.unlinkSync(path.join(srcDir, testFilePdf));
      }
      fs.rmdirSync(srcDir);
    } catch (err) {
      console.error('Error cleaning up srcDir:', err);
    }

    // Delete test files in targetDir
    try {
      if (fs.existsSync(path.join(targetDir, testFileTxt))) {
        fs.unlinkSync(path.join(targetDir, testFileTxt));
      }
      if (fs.existsSync(path.join(targetDir, testFilePdf))) {
        fs.unlinkSync(path.join(targetDir, testFilePdf));
      }
      fs.rmdirSync(targetDir);
    } catch (err) {
      console.error('Error cleaning up targetDir:', err);
    }
  });

  test('should move files with specified extensions', () => {
    moveFiles(srcDir, ['txt'], targetDir);
    expect(fs.existsSync(path.join(targetDir, testFileTxt))).toBe(true);
    expect(fs.existsSync(path.join(srcDir, testFileTxt))).toBe(false);
  });

  test('should log messages', () => {
    logMessage('Test log message');
    const logs = fs.readFileSync(path.join(__dirname, '..', 'audit.log'), 'utf-8');
    expect(logs).toMatch(/Test log message/);
  });
});
